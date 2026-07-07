import { axiosInstance } from "@/lib/axios";
import type { OccupationType } from "@/types";

export interface ClaimResponse {
  id: string; userId: string; policyId: string; claimType: string;
  occupation: OccupationType; description: string; evidenceUrls: string[];
  status: "submitted" | "under_review" | "approved" | "rejected" | "paid";
  reference: string; submittedAt: string; updatedAt: string; payoutAmount?: number;
}

export const claimsService = {
  list: () =>
    axiosInstance.get<{ claims: ClaimResponse[]; total: number }>("/claims").then((r) => r.data),

  get: (id: string) =>
    axiosInstance.get<{ claim: ClaimResponse }>(`/claims/${id}`).then((r) => r.data),

  submit: (data: {
    policyId?: string;
    claimType: string;
    occupation: OccupationType;
    description?: string;
    evidenceUrls?: string[];
  }) =>
    axiosInstance
      .post<{ claim: ClaimResponse; message: string }>("/claims", data)
      .then((r) => r.data),
};
