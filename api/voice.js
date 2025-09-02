// api/voice.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Say voice="alice">Hi, thanks for calling Saydee’s Hand Car Wash on the Sunshine Coast. Please hold while I connect you to our AI receptionist.</Say>
      <Connect>
        <Stream url="wss://${process.env.VERCEL_URL}/api/realtime" />
      </Connect>
    </Response>
  `);
}
