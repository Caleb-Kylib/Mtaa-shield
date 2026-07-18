# Africa's Talking USSD setup

The customer USSD callback is available at:

```
POST https://YOUR_API_HOST/api/ussd/callback
```

It accepts the form fields sent by Africa's Talking: `sessionId`, `serviceCode`,
`phoneNumber`, and `text`. Responses are plain text and always start with `CON`
(continue a session) or `END` (finish a session).

## Configure Africa's Talking

1. Create or sign in to the Africa's Talking Sandbox while developing, then create a USSD channel.
2. Start the API locally and expose it through an HTTPS tunnel. For example, if the API runs on port 5000, expose `http://localhost:5000`.
3. In **USSD → Service Codes**, set the callback URL to your public URL plus `/api/ussd/callback`.
4. Optionally set the events URL to `/api/ussd/events`.
5. Use the Africa's Talking simulator to dial the sandbox code. Sandbox USSD sessions run in the simulator, not a handset.

For production, deploy the backend at a public HTTPS URL, request/assign the live service code, then update its callback URL in the Africa's Talking dashboard.

## Local callback test

```powershell
Invoke-WebRequest -Method POST http://localhost:5000/api/ussd/callback `
  -ContentType 'application/x-www-form-urlencoded' `
  -Body 'sessionId=test-001&serviceCode=*384*1234%23&phoneNumber=%2B254712345678&text='
```

The service includes registration, plan browsing, policy details, claim submission,
claim status, and renewal flows. Phone numbers are normalized to Kenyan `+254…`
format before customer lookup.
