import { NextRequest } from "next/server";
import { ok, err } from "@/lib/api-helpers";
import { insurancePackages } from "@/data/packages";

interface ChatRequest {
  message: string;
  language?: string;
  history?: { role: "user" | "assistant"; text: string }[];
}

/** Keyword-based intent detection and response engine.
 *  Swap the body of `generateResponse` for a real LLM call (OpenAI, Gemini, etc.) */
function generateResponse(message: string, language = "English"): {
  text: string;
  suggestedPackageId?: string;
  confidence?: number;
} {
  const lower = message.toLowerCase();

  // Occupation detection
  const isBoda = /boda|nduthi|rider|pikipiki|motorcycle/.test(lower);
  const isFarmer = /farm|mkulima|mahindi|shamba|ng.ombe|crop|animal/.test(lower);
  const isTrader = /trader|biashara ya mtaani|mama mboga|market|stall|duka|vendor/.test(lower);
  const isConstruction = /fundi|construction|building|site|worker|contractor/.test(lower);
  const isGig = /gig|freelance|online|designer|developer|writer|delivery/.test(lower);
  const isBusiness = /business|shop|store|biashara|enterprise/.test(lower);

  // Greeting / opening
  const isGreeting = /jambo|hello|hi|hujambo|habari|sasa/.test(lower);

  // Topic detection
  const askingAboutClaims = /claim|madai|file|accident|theft|injured|lost|damaged/.test(lower);
  const askingAboutPrice = /price|bei|cost|cheap|affordable|how much/.test(lower);
  const askingAboutMpesa = /mpesa|pay|malipa|lipa/.test(lower);
  const askingSwahili = /swahili|kiswahili/.test(lower);

  if (askingSwahili || language === "Swahili") {
    return {
      text: "Sawa! Naweza kukusaidia kwa Kiswahili. Wewe hufanya kazi gani ili nikusaidie kupata bima inayofaa?",
    };
  }

  if (isGreeting) {
    return {
      text: "Jambo! Mimi ni AI advisor wako wa Mtaa Shield. Ninaweza kukusaidia kupata bima inayofaa kwa kazi yako. Unafanya kazi gani?",
    };
  }

  if (askingAboutClaims) {
    return {
      text: "To file a claim, go to the Claims section in your dashboard. You can also dial *384*10# on any phone. Most claims are reviewed and paid within 48 hours via M-Pesa. What type of incident occurred?",
    };
  }

  if (askingAboutMpesa) {
    return {
      text: "Yes! All premiums and claim payouts go through M-Pesa. You'll receive an STK push to your registered number. No bank account needed. Which plan are you interested in?",
    };
  }

  if (isBoda) {
    const pkg = insurancePackages.find((p) => p.id === "rider-plus");
    return {
      text: `As a boda rider, I recommend **Rider Plus** at KES 250/week. It covers:\n• Personal accident & injuries\n• Bike theft protection\n• Third-party liability\n• Passenger injury cover\n• 7-day income replacement\n\nShall I help you get started with M-Pesa payment?`,
      suggestedPackageId: "rider-plus",
      confidence: 94,
    };
  }

  if (isFarmer) {
    const hasAnimal = /animal|ng.ombe|goat|mbuzi|cow|poultry|kuku|livestock/.test(lower);
    if (hasAnimal) {
      return {
        text: `For livestock protection, our **Animal Cover** plan at KES 90/week covers:\n• Death by disease or illness\n• Predator & wildlife attacks\n• Theft & rustling\n• Emergency vet costs\n• Transit accidents\n\nWould you like to add this to a Farm Plus plan for complete protection?`,
        suggestedPackageId: "animal-cover",
        confidence: 91,
      };
    }
    return {
      text: `For farmers, I recommend **Farm Plus** at KES 150/week. It covers crop failure, drought, livestock accidents, equipment damage, and 14-day income replacement.\n\nDo you also have livestock you'd like to cover separately?`,
      suggestedPackageId: "farm-plus",
      confidence: 89,
    };
  }

  if (isTrader) {
    return {
      text: `For market traders, **Biashara Plus** at KES 200/week covers fire, theft, stock spoilage, business interruption, and health emergency cash. What type of goods do you sell?`,
      suggestedPackageId: "biashara-plus",
      confidence: 88,
    };
  }

  if (isConstruction) {
    return {
      text: `For construction workers, **Fundi Plus** at KES 220/week covers on-site injuries, disability, tool theft up to KES 80k, and income replacement for up to 10 days. Are you self-employed or working for a contractor?`,
      suggestedPackageId: "fundi-plus",
      confidence: 87,
    };
  }

  if (isGig) {
    return {
      text: `For gig workers and freelancers, **Gig Plus** at KES 180/week covers your devices, equipment theft, income loss from illness, and cyber protection. What devices do you rely on for work?`,
      suggestedPackageId: "gig-plus",
      confidence: 86,
    };
  }

  if (isBusiness) {
    return {
      text: `For small business owners, **Business Plus** at KES 300/week gives you fire, equipment, stock, business interruption, and employee accident cover up to KES 600,000. How many employees do you have?`,
      suggestedPackageId: "business-plus",
      confidence: 85,
    };
  }

  if (askingAboutPrice) {
    return {
      text: `Our plans start from as little as **KES 50/week** for farmers. Boda riders start at KES 100/week. All plans support weekly, monthly (-5%), and quarterly (-10%) payment. Which occupation best describes you?`,
    };
  }

  // Generic fallback
  return {
    text: `Thanks for reaching out! To find you the best plan, I need to know a bit more. How do you earn your income? For example: Are you a boda rider, farmer, market trader, construction worker, or small business owner?`,
  };
}

/** POST /api/ai/chat — AI insurance advisor endpoint */
export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, language = "English" } = body;

    if (!message?.trim()) return err("Message is required");

    // Simulate slight processing delay
    await new Promise((r) => setTimeout(r, 400));

    const response = generateResponse(message, language);

    // If a package was suggested, attach its details
    let suggestedPackage = null;
    if (response.suggestedPackageId) {
      suggestedPackage = insurancePackages.find((p) => p.id === response.suggestedPackageId) ?? null;
    }

    return ok({
      text: response.text,
      suggestedPackage,
      confidence: response.confidence ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return err("Internal server error", 500);
  }
}
