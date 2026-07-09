import { prisma } from '../../prisma/client';

// ─────────────────────────────────────────────
// USSD text arrives as a "*"-separated string.
// e.g. "1*2*1" → ["1","2","1"]
// CON = continue (show more menus)
// END = terminate session
// ─────────────────────────────────────────────

export class UssdService {
  public static async handleCallback(
    sessionId: string,
    serviceCode: string,
    phoneNumber: string,
    text: string
  ): Promise<string> {
    const textArray = text === '' ? [] : text.split('*');

    const user = await prisma.user.findUnique({
      where: { phone: phoneNumber },
    });

    if (!user) {
      return this.handleUnregisteredUser(textArray, phoneNumber);
    }

    return this.handleRegisteredUser(user, textArray);
  }

  // ─────────────────────────────────────────
  // UNREGISTERED USER FLOW
  // ─────────────────────────────────────────

  private static async handleUnregisteredUser(
    textArray: string[],
    phoneNumber: string
  ): Promise<string> {
    if (textArray.length === 0) {
      return `CON Welcome to Mtaa Shield!\nYou are not registered.\n\n1. Register`;
    }

    if (textArray[0] === '1') {
      if (textArray.length === 1) return `CON Enter your Full Name:`;
      if (textArray.length === 2) return `CON Enter your County:`;

      if (textArray.length === 3) {
        const fullName = textArray[1];
        const county   = textArray[2];
        try {
          await prisma.user.create({
            data: {
              fullName,
              phone: phoneNumber,
              county,
              email: `${phoneNumber}@placeholder.com`,
              password: 'defaultUssdPassword123!',
              occupation: 'FARMER',
              preferredLanguage: 'en',
            },
          });
          return `END Registration successful!\nWelcome to Mtaa Shield, ${fullName}.\nDial again to access services.`;
        } catch (err) {
          console.error('USSD Registration error:', err);
          return `END Registration failed. Please try again later.`;
        }
      }
    }

    return `END Invalid input. Please try again.`;
  }

  // ─────────────────────────────────────────
  // MAIN MENU (registered user)
  // ─────────────────────────────────────────

  private static async handleRegisteredUser(
    user: any,
    textArray: string[]
  ): Promise<string> {
    if (textArray.length === 0) {
      return (
        `CON Welcome, ${user.fullName}!\n` +
        `1. Buy Insurance\n` +
        `2. My Policies\n` +
        `3. Make a Claim\n` +
        `4. Claim Status\n` +
        `5. Renew Policy`
      );
    }

    switch (textArray[0]) {
      case '1': return this.handleBuyInsurance(user, textArray);
      case '2': return this.handleMyPolicies(user, textArray);
      case '3': return this.handleMakeClaim(user, textArray);
      case '4': return this.handleClaimStatus(user, textArray);
      case '5': return this.handleRenewPolicy(user, textArray);
      default:  return `END Invalid selection. Please try again.`;
    }
  }

  // ─────────────────────────────────────────
  // 1. BUY INSURANCE
  // ─────────────────────────────────────────
  // Flow: 1 → occupation list → plan list → confirm

  private static async handleBuyInsurance(
    user: any,
    textArray: string[]
  ): Promise<string> {
    // Level 1 – show occupation categories
    if (textArray.length === 1) {
      return (
        `CON Select your occupation:\n` +
        `1. Farmer\n` +
        `2. Boda Boda Rider\n` +
        `3. Market Trader\n` +
        `4. Small Vendor\n` +
        `5. Construction Worker\n` +
        `6. Gig Worker`
      );
    }

    const occupationMap: Record<string, string> = {
      '1': 'FARMER',
      '2': 'BODA_RIDER',
      '3': 'MARKET_TRADER',
      '4': 'SMALL_VENDOR',
      '5': 'CONSTRUCTION_WORKER',
      '6': 'GIG_WORKER',
    };

    const occupationKey = textArray[1];
    const occupation    = occupationMap[occupationKey];

    if (!occupation) return `END Invalid occupation. Please try again.`;

    // Level 2 – list plans for chosen occupation
    if (textArray.length === 2) {
      const plans = await prisma.insurancePlan.findMany({
        where: { targetOccupation: occupation as any, isActive: true },
      });

      if (plans.length === 0) {
        return `END No plans available for your occupation right now.`;
      }

      let response = `CON Available Plans:\n`;
      plans.forEach((plan, i) => {
        response += `${i + 1}. ${plan.name} - KES ${plan.premiumMonthly}/mo\n`;
      });
      return response;
    }

    // Level 3 – show plan detail + confirm
    if (textArray.length === 3) {
      const plans = await prisma.insurancePlan.findMany({
        where: { targetOccupation: occupation as any, isActive: true },
      });

      const planIndex = parseInt(textArray[2]) - 1;
      if (planIndex < 0 || planIndex >= plans.length) {
        return `END Invalid plan selection. Please try again.`;
      }

      const plan = plans[planIndex];
      return (
        `CON ${plan.name}\n` +
        `${plan.description}\n` +
        `Weekly: KES ${plan.premiumWeekly}\n` +
        `Monthly: KES ${plan.premiumMonthly}\n\n` +
        `Select frequency:\n` +
        `1. Weekly\n` +
        `2. Monthly\n` +
        `3. Quarterly`
      );
    }

    // Level 4 – confirm purchase & initiate M-Pesa prompt
    if (textArray.length === 4) {
      const frequencyMap: Record<string, string> = {
        '1': 'WEEKLY',
        '2': 'MONTHLY',
        '3': 'QUARTERLY',
      };

      const freqKey   = textArray[3];
      const frequency = frequencyMap[freqKey];

      if (!frequency) return `END Invalid frequency. Please try again.`;

      const plans = await prisma.insurancePlan.findMany({
        where: { targetOccupation: occupationMap[occupationKey] as any, isActive: true },
      });

      const planIndex = parseInt(textArray[2]) - 1;
      if (planIndex < 0 || planIndex >= plans.length) {
        return `END Invalid selection. Please try again.`;
      }

      const plan = plans[planIndex];
      const premiumMap: Record<string, number> = {
        WEEKLY:    plan.premiumWeekly,
        MONTHLY:   plan.premiumMonthly,
        QUARTERLY: plan.premiumQuarterly,
      };

      const premium = premiumMap[frequency];

      return (
        `END Confirm Purchase:\n` +
        `Plan: ${plan.name}\n` +
        `Frequency: ${frequency}\n` +
        `Amount: KES ${premium}\n\n` +
        `An M-Pesa prompt will be sent to your phone to complete payment.`
      );
    }

    return `END Invalid selection. Please try again.`;
  }

  // ─────────────────────────────────────────
  // 2. MY POLICIES
  // ─────────────────────────────────────────

  private static async handleMyPolicies(
    user: any,
    textArray: string[]
  ): Promise<string> {
    const policies = await prisma.policy.findMany({
      where: { userId: user.id },
      include: { insurancePlan: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    if (textArray.length === 1) {
      if (policies.length === 0) {
        return `END You have no active policies.\nDial again and choose Buy Insurance to get started.`;
      }

      let response = `CON Your Policies:\n`;
      policies.forEach((p, i) => {
        response += `${i + 1}. ${p.insurancePlan.name} (${p.status})\n`;
      });
      return response;
    }

    // Level 2 – policy details
    if (textArray.length === 2) {
      const idx = parseInt(textArray[1]) - 1;
      if (idx < 0 || idx >= policies.length) return `END Invalid selection.`;

      const p = policies[idx];
      const expiry = new Date(p.expiryDate).toLocaleDateString('en-KE');
      return (
        `END Policy: ${p.insurancePlan.name}\n` +
        `Number: ${p.policyNumber}\n` +
        `Status: ${p.status}\n` +
        `Premium: KES ${p.premiumAmount} (${p.paymentFrequency})\n` +
        `Expires: ${expiry}`
      );
    }

    return `END Invalid input.`;
  }

  // ─────────────────────────────────────────
  // 3. MAKE A CLAIM
  // ─────────────────────────────────────────

  private static async handleMakeClaim(
    user: any,
    textArray: string[]
  ): Promise<string> {
    const activePolicies = await prisma.policy.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      include: { insurancePlan: true },
    });

    if (textArray.length === 1) {
      if (activePolicies.length === 0) {
        return `END You have no active policies to make a claim on.`;
      }

      let response = `CON Select policy to claim on:\n`;
      activePolicies.forEach((p, i) => {
        response += `${i + 1}. ${p.insurancePlan.name}\n`;
      });
      return response;
    }

    // Level 2 – select claim type
    if (textArray.length === 2) {
      const idx = parseInt(textArray[1]) - 1;
      if (idx < 0 || idx >= activePolicies.length) return `END Invalid selection.`;

      return (
        `CON Select claim type:\n` +
        `1. Accident\n` +
        `2. Theft\n` +
        `3. Fire\n` +
        `4. Crop Loss\n` +
        `5. Medical`
      );
    }

    // Level 3 – confirm and submit claim
    if (textArray.length === 3) {
      const claimTypeMap: Record<string, string> = {
        '1': 'Accident',
        '2': 'Theft',
        '3': 'Fire',
        '4': 'Crop Loss',
        '5': 'Medical',
      };

      const claimTypeKey  = textArray[2];
      const claimType     = claimTypeMap[claimTypeKey];

      if (!claimType) return `END Invalid claim type. Please try again.`;

      const policyIdx = parseInt(textArray[1]) - 1;
      const policy    = activePolicies[policyIdx];

      if (!policy) return `END Invalid policy selection.`;

      try {
        const claim = await prisma.claim.create({
          data: {
            policyId:    policy.id,
            description: `USSD claim — type: ${claimType}`,
            claimType,
            status:      'PENDING',
            evidence:    [],
          },
        });

        return (
          `END Claim Submitted!\n` +
          `Policy: ${policy.insurancePlan.name}\n` +
          `Type: ${claimType}\n` +
          `Ref: ${claim.id.slice(-8).toUpperCase()}\n` +
          `Status: PENDING\n` +
          `Our team will contact you within 48 hours.`
        );
      } catch (err) {
        console.error('USSD Claim error:', err);
        return `END Claim submission failed. Please try again.`;
      }
    }

    return `END Invalid input.`;
  }

  // ─────────────────────────────────────────
  // 4. CLAIM STATUS
  // ─────────────────────────────────────────

  private static async handleClaimStatus(
    user: any,
    textArray: string[]
  ): Promise<string> {
    // Get user policies and their claims
    const policies = await prisma.policy.findMany({
      where: { userId: user.id },
      include: {
        claims: {
          orderBy: { submittedAt: 'desc' },
          take: 1,
        },
        insurancePlan: true,
      },
    });

    const policiesWithClaims = policies.filter(p => p.claims.length > 0);

    if (textArray.length === 1) {
      if (policiesWithClaims.length === 0) {
        return `END You have no claims on record.`;
      }

      let response = `CON Select policy to check claim:\n`;
      policiesWithClaims.forEach((p, i) => {
        response += `${i + 1}. ${p.insurancePlan.name}\n`;
      });
      return response;
    }

    // Level 2 – show latest claim status for chosen policy
    if (textArray.length === 2) {
      const idx = parseInt(textArray[1]) - 1;
      if (idx < 0 || idx >= policiesWithClaims.length) return `END Invalid selection.`;

      const policy     = policiesWithClaims[idx];
      const claim      = policy.claims[0];
      const submitted  = new Date(claim.submittedAt).toLocaleDateString('en-KE');

      return (
        `END Claim Status:\n` +
        `Policy: ${policy.insurancePlan.name}\n` +
        `Type: ${claim.claimType}\n` +
        `Status: ${claim.status}\n` +
        `Submitted: ${submitted}\n` +
        `Ref: ${claim.id.slice(-8).toUpperCase()}`
      );
    }

    return `END Invalid input.`;
  }

  // ─────────────────────────────────────────
  // 5. RENEW POLICY
  // ─────────────────────────────────────────

  private static async handleRenewPolicy(
    user: any,
    textArray: string[]
  ): Promise<string> {
    const renewablePolicies = await prisma.policy.findMany({
      where: {
        userId: user.id,
        status: { in: ['ACTIVE', 'EXPIRED'] },
      },
      include: { insurancePlan: true },
      orderBy: { expiryDate: 'asc' },
    });

    if (textArray.length === 1) {
      if (renewablePolicies.length === 0) {
        return `END You have no policies available for renewal.`;
      }

      let response = `CON Select policy to renew:\n`;
      renewablePolicies.forEach((p, i) => {
        const expiry = new Date(p.expiryDate).toLocaleDateString('en-KE');
        response += `${i + 1}. ${p.insurancePlan.name} (exp: ${expiry})\n`;
      });
      return response;
    }

    // Level 2 – select renewal frequency
    if (textArray.length === 2) {
      const idx = parseInt(textArray[1]) - 1;
      if (idx < 0 || idx >= renewablePolicies.length) return `END Invalid selection.`;

      const policy = renewablePolicies[idx];
      return (
        `CON Renew ${policy.insurancePlan.name}\n` +
        `Select payment frequency:\n` +
        `1. Weekly  - KES ${policy.insurancePlan.premiumWeekly}\n` +
        `2. Monthly - KES ${policy.insurancePlan.premiumMonthly}\n` +
        `3. Quarterly - KES ${policy.insurancePlan.premiumQuarterly}`
      );
    }

    // Level 3 – confirm renewal
    if (textArray.length === 3) {
      const policyIdx  = parseInt(textArray[1]) - 1;
      const freqKey    = textArray[2];

      const policy = renewablePolicies[policyIdx];
      if (!policy) return `END Invalid policy selection.`;

      const frequencyMap: Record<string, { label: string; amount: number }> = {
        '1': { label: 'WEEKLY',    amount: policy.insurancePlan.premiumWeekly },
        '2': { label: 'MONTHLY',   amount: policy.insurancePlan.premiumMonthly },
        '3': { label: 'QUARTERLY', amount: policy.insurancePlan.premiumQuarterly },
      };

      const freq = frequencyMap[freqKey];
      if (!freq) return `END Invalid frequency. Please try again.`;

      return (
        `END Renewal Confirmed!\n` +
        `Policy: ${policy.insurancePlan.name}\n` +
        `Frequency: ${freq.label}\n` +
        `Amount: KES ${freq.amount}\n\n` +
        `An M-Pesa prompt will be sent to your phone to complete renewal.`
      );
    }

    return `END Invalid input.`;
  }
}
