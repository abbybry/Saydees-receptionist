export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Say voice="alice">Hi, thanks for calling Saydee Hand Car Wash on the Sunshine Coast. Please let me know how i can assist you today.</Say>
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
