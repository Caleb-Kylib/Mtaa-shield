# Mtaa Shield 🛡️

**An AI-Powered Microinsurance Platform for Africa**

Mtaa Shield is a modern, responsive, production-quality frontend designed to make insurance accessible, affordable, and understandable for Africa's informal workforce. 

It combines artificial intelligence, multilingual support, and inclusive digital channels to bridge the insurance gap for millions of underserved people—including small-scale farmers, boda boda riders, and market traders.

---

## 🌟 Vision

To make insurance as simple as buying airtime by giving every African, regardless of their phone type or income level, access to affordable insurance through AI-powered guidance.

## ✨ Core Features

- **AI Assistant**: A conversational AI that recommends suitable insurance packages, explains policies in simple language, and assists users during claims. (Currently mocked in frontend).
- **Flexible Payments**: Weekly, monthly, or quarterly premium payments (mocked via M-Pesa).
- **Occupation-Based Packages**: Tailored microinsurance for Farmers, Boda Riders, and Market Traders.
- **Premium Design System**: Built with modern African fintech aesthetics in mind—clean, trustworthy, and mobile-first.
- **Offline Readiness (Concept)**: Designed with the intent to eventually support USSD, SMS, and Voice interfaces.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: Vanilla CSS with a comprehensive CSS Variables Design System.
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Mtaa-connect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to see Mtaa Shield in action.

## 📂 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages and layout
│   │   ├── ai-assistant/   # AI chat interface page
│   │   ├── dashboard/      # User portal page
│   │   ├── packages/       # Insurance plans page
│   │   ├── globals.css     # Global CSS and Design Tokens
│   │   ├── layout.jsx      # Global layout wrap
│   │   └── page.jsx        # Landing page
│   ├── components/         # Reusable UI components
│   │   ├── Footer.jsx
│   │   └── Navigation.jsx
├── next.config.mjs         # Next.js configuration
├── package.json            # Project metadata and dependencies
└── .gitignore              # Ignored files for Git
```

## 🎨 Design System

Mtaa Shield avoids generic styles by employing a curated, harmonious color palette defined via CSS variables in `src/app/globals.css`:
- **Primary**: Deep Forest Green (`#0A5239`)
- **Accent**: Warm Sun Orange (`#F69927`)
- **Background**: Off-white (`#F8FAFC`) for high contrast and readability.

The styling leverages modern CSS practices, ensuring components feel highly responsive with subtle micro-animations on hover states.

---
*Built for the Hustle.*
