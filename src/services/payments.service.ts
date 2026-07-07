import { axiosInstance } from "@/lib/axios";

export interface PaymentResponse {
  id: string; userId: string; policyId: string; amount: number;
  method: string; mpesaRef?: string; status: string; date: string;
}

export const paymentsService = {
  list: (page = 1, limit = 10) =>
    axiosInstance
      .get<{ payments: PaymentResponse[]; total: number; page: number; totalPages: number }>(
        `/payments?page=${page}&limit=${limit}`
      )
      .then((r) => r.data),

  initiateMpesa: (data: { policyId: string; amount: number; phone: string }) =>
    axiosInstance
      .post<{ checkoutRequestId: string; payment: PaymentResponse; message: string }>(
        "/payments",
        data
      )
      .then((r) => r.data),
};
