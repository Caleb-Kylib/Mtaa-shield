import { axiosInstance } from "@/lib/axios";

export interface NotificationResponse {
  id: string; userId: string; title: string; message: string;
  type: "payment" | "claim" | "policy" | "promo" | "system";
  read: boolean; createdAt: string;
}

export const notificationsService = {
  list: () =>
    axiosInstance
      .get<{ notifications: NotificationResponse[]; unreadCount: number }>("/notifications")
      .then((r) => r.data),

  markAllRead: () =>
    axiosInstance
      .patch<{ message: string }>("/notifications")
      .then((r) => r.data),
};
