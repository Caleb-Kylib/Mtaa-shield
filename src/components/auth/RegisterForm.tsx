"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axios";
import { KENYAN_COUNTIES } from "@/constants";

const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:4[0-3])|(?:9[0-9])|(?:5[7-9])|(?:6[8-9])|(?:8[0-9]))[0-9]{6})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z.string().regex(phoneRegex, { message: "Enter a valid Kenyan phone number" }),
  county: z.string().min(2, { message: "County is required" }),
  occupation: z.string().min(1, { message: "Please select your occupation" }),
  password: z.string().regex(passwordRegex, { message: "Min 8 chars, include upper, lower, number & symbol" }),
  confirmPassword: z.string(),
  terms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const occupationOptions = [
  { value: "farmer", label: "🌾 Farmer" },
  { value: "boda-rider", label: "🏍️ Boda Rider" },
  { value: "market-trader", label: "🛒 Market Trader" },
  { value: "construction-worker", label: "👷 Construction Worker" },
  { value: "gig-worker", label: "💼 Gig Worker / Freelancer" },
  { value: "small-business", label: "🏪 Small Business Owner" },
];

export function RegisterForm() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/auth/register", data);
      login(response.data.token, response.data.user);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `h-10 rounded-xl text-sm ${hasError ? "border-red-400 focus-visible:ring-red-300" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-h-[85vh] overflow-y-auto pr-1"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm">Join thousands of Africans protecting their livelihoods.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3.5 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-gray-700 text-xs font-semibold">Full Name</Label>
            <Input id="name" placeholder="Jane Doe" {...register("name")} className={inputClass(!!errors.name)} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-700 text-xs font-semibold">Email</Label>
            <Input id="email" type="email" placeholder="you@email.com" {...register("email")} className={inputClass(!!errors.email)} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-gray-700 text-xs font-semibold">Phone Number</Label>
            <Input id="phone" placeholder="0712 345 678" {...register("phone")} className={inputClass(!!errors.phone)} />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="county" className="text-gray-700 text-xs font-semibold">County</Label>
            <select
              id="county"
              {...register("county")}
              className={`flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.county ? "border-red-400" : ""}`}
            >
              <option value="">Select county</option>
              {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.county && <p className="text-red-500 text-xs">{errors.county.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="occupation" className="text-gray-700 text-xs font-semibold">How do you earn your income?</Label>
          <select
            id="occupation"
            {...register("occupation")}
            className={`flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.occupation ? "border-red-400" : ""}`}
          >
            <option value="">Select your hustle</option>
            {occupationOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-gray-700 text-xs font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`${inputClass(!!errors.password)} pr-8`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-gray-700 text-xs font-semibold">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} className={inputClass(!!errors.confirmPassword)} />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 mt-0.5"
          />
          <Label htmlFor="terms" className="font-normal text-xs text-gray-500 cursor-pointer leading-relaxed">
            I agree to Mtaa Shield&apos;s{" "}
            <Link href="#" className="text-emerald-600 hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="text-emerald-600 hover:underline">Privacy Policy</Link>.
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

        <Button
          type="submit"
          className="w-full h-11 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
