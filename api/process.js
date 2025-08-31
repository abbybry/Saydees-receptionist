// pages/api/process.js
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: true,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const recordingUrl = req.body.RecordingUrl;

  // 1. Transcribe caller recording
  const transcription = await openai.audio.transcriptions.create({
    file: recordingUrl,
    model: "gpt-4o-mini-transcribe",
  });

  const userMessage = transcription.text;

  // 2. Get AI reply
  const reply = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are the AI receptionist for Saydee’s Hand Car Wash. Be friendly, concise, and always mention services, pricing, hours, or booking options if relevant.",
      },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = reply.choices[0].message.content;

  // 3. Generate speech with ElevenLabs
  const ttsResponse = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: aiResponse }),
    }
  );

  const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
  const audioBase64 = audioBuffer.toString("base64");

  // 4. Reply to Twilio with AI voice
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Play>data:audio/mpeg;base64,${audioBase64}</Play>
      <Record action="/api/process" method="POST" playBeep="true" maxLength="10" timeout="5" />
    </Response>
  `);
}
