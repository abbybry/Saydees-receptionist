// api/process.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const recordingUrl = req.body.RecordingUrl;

    // 1. Transcribe
    const transcription = await openai.audio.transcriptions.create({
      file: recordingUrl,
      model: "gpt-4o-mini-transcribe",
    });

    const userMessage = transcription.text;

    // 2. Generate reply
    const reply = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are the friendly AI receptionist for Saydee’s Hand Car Wash in Maroochydore. Answer questions naturally and help with bookings.",
        },
        { role: "user", content: userMessage },
      ],
    });

    const aiResponse = reply.choices[0].message.content;

    // 3. Return TwiML
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Say>${aiResponse}</Say>
        <Record action="/api/process" method="POST" playBeep="true" maxLength="10" />
      </Response>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing call");
  }
}
