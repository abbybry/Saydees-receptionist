// api/voice.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Say voice="alice">Hi, thanks for calling Saydees Hand Car Wash on the Sunshine Coast. Please hold while I connect you to our receptionist.</Say>
      <Connect>
        <Stream url="wss://saydees-receptionist-8lhn.vercel.app/api/realtime" />
      </Connect>
    </Response>
  `);
}
