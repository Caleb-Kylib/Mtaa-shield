"use client";

import { useState, useEffect, useCallback } from "react";
import { policiesService, type PolicyResponse } from "@/services/policies.service";
import { paymentsService, type PaymentResponse } from "@/services/payments.service";
import { claimsService, type ClaimResponse } from "@/services/claims.service";
import { notificationsService, type NotificationResponse } from "@/services/notifications.service";

export function useDashboard() {
  const [policies, setPolicies] = useState<PolicyResponse[]>([]);
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [claims, setClaims] = useState<ClaimResponse[]>([]);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [polRes, payRes, clmRes, notifRes] = await Promise.all([
        policiesService.list().catch(() => ({ policies: [] })),
        paymentsService.list(1, 5).catch(() => ({ payments: [], total: 0, page: 1, totalPages: 1 })),
        claimsService.list().catch(() => ({ claims: [], total: 0 })),
        notificationsService.list().catch(() => ({ notifications: [], unreadCount: 0 })),
      ]);
      
      let allPolicies = [...polRes.policies];
      let allPayments = [...payRes.payments];
      let allNotifications = [...notifRes.notifications];

      // Inject mock policy from localStorage if exists
      if (typeof window !== 'undefined') {
        const mockStr = localStorage.getItem("mtaa_new_policy");
        if (mockStr) {
          const mockPolicy = JSON.parse(mockStr);
          allPolicies.unshift({
            id: mockPolicy.policyNumber,
            userId: "mock",
            insurancePlanId: mockPolicy.id,
            packageName: mockPolicy.name,
            policyNumber: mockPolicy.policyNumber,
            status: "active",
            frequency: "weekly",
            premium: 150,
            coverageAmount: "Up to KES 200,000",
            startDate: mockPolicy.startDate,
            endDate: mockPolicy.nextPayment,
          });
          
          allPayments.unshift({
            id: `pay-${mockPolicy.policyNumber}`,
            policyId: mockPolicy.policyNumber,
            amount: 150,
            method: "MPESA",
            mpesaRef: "QWX1234XYZ",
            status: "success",
            date: mockPolicy.startDate,
          });

          allNotifications.unshift({
            id: `notif-${mockPolicy.policyNumber}`,
            title: `Purchased ${mockPolicy.name}`,
            message: `Your ${mockPolicy.name} policy (${mockPolicy.policyNumber}) is now active.`,
            type: "info",
            read: false,
            date: mockPolicy.startDate,
          });
        }
      }

      setPolicies(allPolicies);
      setPayments(allPayments);
      setClaims(clmRes.claims);
      setNotifications(allNotifications);
      setUnreadCount(notifRes.unreadCount + (typeof window !== 'undefined' && localStorage.getItem("mtaa_new_policy") ? 1 : 0));
    } catch (e) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const activePolicy = policies.find((p) => p.status === "active") ?? null;
  const totalPaid = payments.reduce((sum, p) => sum + (p.status === "success" ? p.amount : 0), 0);

  return {
    policies, payments, claims, notifications, unreadCount,
    activePolicy, totalPaid,
    loading, error, refetch: fetchAll,
  };
}
