// api/voice.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Say voice="alice">Hi, thanks for calling Saydee’s Hand Car Wash. The AI receptionist is being set up.</Say>
    </Response>
  `);
}
