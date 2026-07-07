import { axiosInstance } from "@/lib/axios";
import type { InsurancePackage, OccupationType } from "@/types";

export interface ChatResponse {
  text: string;
  suggestedPackage: InsurancePackage | null;
  confidence: number | null;
  timestamp: string;
}

export interface RecommendResponse {
  recommendedPackage: InsurancePackage;
  confidence: number;
  suggestedAddOns: { id: string; name: string; weeklyPrice: number }[];
  reasoning: string;
}

export const aiService = {
  chat: (data: {
    message: string;
    language?: string;
    history?: { role: "user" | "assistant"; text: string }[];
  }) =>
    axiosInstance.post<ChatResponse>("/ai/chat", data).then((r) => r.data),

  recommend: (data: {
    occupation: OccupationType;
    incomeFrequency: "daily" | "weekly" | "monthly";
    county: string;
    monthlyBudget: number;
    hasAssets?: boolean;
    hasFamily?: boolean;
  }) =>
    axiosInstance.post<RecommendResponse>("/ai/recommend", data).then((r) => r.data),
};
