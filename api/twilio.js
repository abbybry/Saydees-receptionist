export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Say voice="alice">Hi, thanks for calling Saydee’s Hand Car Wash on the Sunshine Coast. Please say something after the beep.</Say>
      <Record 
        action="/api/process"
        method="POST"
        playBeep="true"
        maxLength="10"
        timeout="5"
      />
      <Say>I didn’t receive any input. Goodbye!</Say>
    </Response>
  `);
}
