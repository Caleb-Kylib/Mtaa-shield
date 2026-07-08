export interface USSDPayload {
  sessionId?: string;
  serviceCode?: string;
  phoneNumber?: string;
  text?: string;
  networkCode?: string;
}

const sessionStates = new Map<string, string>();

export function buildUssdResponse(payload: USSDPayload): string {
  const text = (payload.text ?? "").trim();
  const sessionId = payload.sessionId ?? "default";
  const phoneNumber = payload.phoneNumber ?? "your phone";

  if (!text) {
    sessionStates.set(sessionId, "menu");
    return [
      "CON Welcome to Mtaa Shield 👋",
      "1. Check policy",
      "2. Pay premium",
      "3. Report claim",
      "4. Talk to support",
    ].join("\n");
  }

  const selection = text.split("*").pop()?.trim() ?? text;
  sessionStates.set(sessionId, selection);

  switch (selection) {
    case "1":
      return "END Hello " + phoneNumber + ". Your policy is active and your next premium is due on 08/07/2026.";
    case "2":
      return "END To pay your premium, use the Mtaa Shield app or M-Pesa with the payment instructions sent to your phone.";
    case "3":
      return "END To report a claim, open the app and submit your claim details. Our team will review it shortly.";
    case "4":
      return "END Please call our support line on +254 700 000 000 or reply to this SMS for help.";
    default:
      return "END Invalid selection. Please try again.";
  }
}
