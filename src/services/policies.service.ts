import { axiosInstance } from "@/lib/axios";
import type { PaymentFrequency } from "@/types";

export interface PolicyResponse {
  id: string; userId: string; packageId: string; packageName: string;
  frequency: PaymentFrequency; premium: number; status: string;
  startDate: string; endDate: string; policyNumber: string;
  coverageAmount: string; addOns: string[]; createdAt: string;
}

export const policiesService = {
  list: () =>
    axiosInstance.get<{ policies: PolicyResponse[] }>("/policies").then((r) => r.data),

  get: (id: string) =>
    axiosInstance.get<{ policy: PolicyResponse }>(`/policies/${id}`).then((r) => r.data),

  purchase: (data: { packageId: string; frequency: PaymentFrequency; addOns?: string[] }) =>
    axiosInstance.post<{ policy: PolicyResponse; message: string }>("/policies", data).then((r) => r.data),

  cancel: (id: string) =>
    axiosInstance.patch<{ message: string; policy: PolicyResponse }>(`/policies/${id}`, { status: "cancelled" }).then((r) => r.data),
};
