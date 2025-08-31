// api/voice.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Connect>
        <Stream url="wss://saydees-receptionist-8lhn.vercel.app/api/realtime" />
      </Connect>
    </Response>
  `);
}
