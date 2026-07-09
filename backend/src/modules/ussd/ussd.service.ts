import { prisma } from '../../prisma/client';

export class UssdService {
  public static async handleCallback(
    sessionId: string,
    serviceCode: string,
    phoneNumber: string,
    text: string
  ): Promise<string> {
    // USSD text comes as a string separated by *, e.g. "1*2*1"
    const textArray = text === '' ? [] : text.split('*');
    
    // Find if user is registered
    const user = await prisma.user.findUnique({
      where: { phone: phoneNumber }
    });

    if (!user) {
      return this.handleUnregisteredUser(textArray, phoneNumber);
    }

    return this.handleRegisteredUser(user, textArray);
  }

  private static async handleUnregisteredUser(textArray: string[], phoneNumber: string): Promise<string> {
    if (textArray.length === 0) {
      return `CON Welcome to Mtaa Shield. Please register to continue.
1. Register`;
    }

    if (textArray[0] === '1') {
      if (textArray.length === 1) {
        return `CON Enter your Full Name:`;
      }
      
      if (textArray.length === 2) {
        return `CON Enter your County:`;
      }

      if (textArray.length === 3) {
        const fullName = textArray[1];
        const county = textArray[2];

        try {
          await prisma.user.create({
            data: {
              fullName,
              phone: phoneNumber,
              county,
              email: `${phoneNumber}@placeholder.com`, // Unique placeholder for email
              password: 'defaultUssdPassword123!', // Should be handled properly later
              occupation: 'FARMER', // Default occupation for USSD registration
              preferredLanguage: 'en',
            }
          });
          return `END Registration successful! Welcome to Mtaa Shield, ${fullName}. Dial the USSD code again to access services.`;
        } catch (error) {
           console.error('USSD Registration error:', error);
           return `END Registration failed. Please try again later.`;
        }
      }
    }

    return `END Invalid input. Please try again.`;
  }

  private static async handleRegisteredUser(user: any, textArray: string[]): Promise<string> {
    if (textArray.length === 0) {
      return `CON Welcome back ${user.fullName} to Mtaa Shield!
1. View Insurance Plans
2. My Policies
3. File a Claim
4. My Profile`;
    }

    const firstSelection = textArray[0];

    switch (firstSelection) {
      case '1':
        return this.handleInsurancePlans(textArray);
      case '2':
        return this.handleMyPolicies(user.id, textArray);
      case '3':
        return `END Claim filing via USSD is coming soon! For now, use the Mtaa Shield app.`;
      case '4':
        return `END Profile Details:
Name: ${user.fullName}
County: ${user.county}
Role: ${user.role}`;
      default:
        return `END Invalid selection. Please try again.`;
    }
  }

  private static async handleInsurancePlans(textArray: string[]): Promise<string> {
    if (textArray.length === 1) {
      const plans = await prisma.insurancePlan.findMany({
        where: { isActive: true },
        take: 3
      });
      
      if (plans.length === 0) {
        return `END No insurance plans available at the moment.`;
      }

      let response = `CON Available Insurance Plans:\n`;
      plans.forEach((plan, index) => {
         response += `${index + 1}. ${plan.name} (KES ${plan.premiumMonthly}/mo)\n`;
      });
      return response;
    }
    
    // Simulated deep link to plan details
    return `END Thank you for your interest. A representative will contact you with more details regarding this plan.`;
  }

  private static async handleMyPolicies(userId: string, textArray: string[]): Promise<string> {
    const policies = await prisma.policy.findMany({
      where: { userId },
      include: { insurancePlan: true },
      take: 3
    });

    if (policies.length === 0) {
      return `END You do not have any active policies.`;
    }

    if (textArray.length === 1) {
      let response = `CON Your Policies:\n`;
      policies.forEach((policy, index) => {
         response += `${index + 1}. ${policy.insurancePlan.name} - ${policy.status}\n`;
      });
      return response;
    }

    // Detail view
    const selectedIndex = parseInt(textArray[1]) - 1;
    if (selectedIndex >= 0 && selectedIndex < policies.length) {
       const selectedPolicy = policies[selectedIndex];
       return `END Policy: ${selectedPolicy.insurancePlan.name}
Status: ${selectedPolicy.status}
Premium: KES ${selectedPolicy.premiumAmount}`;
    }

    return `END Invalid selection.`;
  }
}
