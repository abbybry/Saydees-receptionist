# Saydee’s AI Receptionist

AI-powered phone receptionist for Saydee’s Hand Car Wash (Sunshine Coast, QLD).

## Features
- Answers inbound calls naturally
- Provides business info (services, prices, hours, location)
- Takes bookings + sends SMS confirmations
- Escalates to a human if needed

## Stack
- Twilio (calls + SMS)
- OpenAI (speech-to-text + conversation)
- ElevenLabs (voice)
- n8n (workflows + bookings)
- Supabase (data + logs)
- Vercel (hosting)

## Endpoints
- `/api/voice` → Handles incoming calls (Twilio XML response)
- `/api/realtime` → WebSocket (for streaming AI conversation)
- `/api/process` → (optional) record/transcribe/reply mode
