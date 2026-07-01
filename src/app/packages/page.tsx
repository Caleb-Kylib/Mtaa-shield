"use client";

import { Suspense } from "react";
import PackagesContent from "./PackagesContent";

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading plans...</p>
        </div>
      </div>
    }>
      <PackagesContent />
    </Suspense>
  );
}
