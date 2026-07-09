"use client"; 



import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { Shield, Smartphone, ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "@/hooks/useAuth";

import { getPackageById, calculatePrice } from "@/data/packages";

import { occupations } from "@/data/occupations";

import type { PaymentFrequency } from "@/types";



const checkoutSchema = z.object({

  phone: z.string().regex(/^(07|01|2547|2541)\d{8}$/, "Enter a valid Safaricom M-Pesa number"),

  terms: z.literal(true, {

    errorMap: () => ({ message: "You must accept the terms and conditions" }),

  }),

});



type CheckoutFormValues = z.infer<typeof checkoutSchema>;



export default function CheckoutPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const { user } = useAuth();

  

  const planId = searchParams.get("planId");

  const freq = (searchParams.get("freq") || "weekly") as PaymentFrequency;

  

  const [isLoading, setIsLoading] = useState(false);

  

  const pkg = getPackageById(planId || "");

  const occupation = pkg ? occupations.find(o => o.id === pkg.occupation) : null;

  const price = pkg ? calculatePrice(pkg, freq) : 0;



  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<CheckoutFormValues>({

    resolver: zodResolver(checkoutSchema),

    defaultValues: {

      phone: user?.phone || "",

    },

    mode: "onChange"

  });



  const termsAccepted = watch("terms");



  useEffect(() => {

    if (user?.phone) {

      setValue("phone", user.phone);

    }

  }, [user, setValue]);



  if (!pkg) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center p-4">

        <h2 className="text-2xl font-bold mb-4">Plan not found</h2>

        <Button onClick={() => router.push("/packages")}>Back to Packages</Button>

      </div>

    );

  }



  const onSubmit = async (data: CheckoutFormValues) => {

    setIsLoading(true);

    // Simulate API call to init STK push

    setTimeout(() => {

      // Pass details via query params to the payment status page

      router.push(`/payment-status?planId=${pkg.id}&freq=${freq}&phone=${data.phone}`);

    }, 1000);

  };



  return (

    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-xl mx-auto">

        <button 

          onClick={() => router.back()}

          className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-6"

        >

          <ArrowLeft size={16} className="mr-1" /> Back

        </button>



        <div className="text-center mb-8">

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>

          <p className="mt-2 text-gray-500">Review your insurance cover before completing payment.</p>

        </div>



        <motion.div 

          initial={{ opacity: 0, y: 10 }}

          animate={{ opacity: 1, y: 0 }}

          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"

        >

          {/* Policy Summary */}

          <div className={`p-6 sm:p-8 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white`}>

            <div className="flex justify-between items-start mb-6">

              <div>

                <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wider mb-1">

                  {occupation?.emoji} {occupation?.label}

                </p>

                <h2 className="text-2xl font-bold">{pkg.name}</h2>

              </div>

              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">

                <Shield className="text-white" size={24} />

              </div>

            </div>

            

            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">

                <p className="text-emerald-100 text-xs mb-1">Duration</p>

                <p className="font-semibold capitalize">{freq}</p>

              </div>

              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">

                <p className="text-emerald-100 text-xs mb-1">Premium</p>

                <p className="font-semibold">KES {price.toLocaleString()}</p>

              </div>

            </div>



            <div>

              <p className="text-emerald-100 text-xs mb-2">Coverage Included</p>

              <ul className="space-y-1">

                {pkg.features.slice(0, 3).map((f, i) => (

                  <li key={i} className="flex items-center text-sm">

                    <CheckCircle2 size={14} className="text-emerald-300 mr-2" />

                    <span className="opacity-90">{f}</span>

                  </li>

                ))}

              </ul>

            </div>

          </div>



          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">

            {/* Customer Info (Auto-filled) */}

            <div className="mb-8">

              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Details</h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">

                <div className="flex justify-between">

                  <span className="text-sm text-gray-500">Name</span>

                  <span className="text-sm font-medium text-gray-900">{user?.name || "Guest User"}</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-sm text-gray-500">County</span>

                  <span className="text-sm font-medium text-gray-900">{user?.county || "Nairobi"}</span>

                </div>

              </div>

            </div>



            {/* Payment Method */}

            <div className="mb-8">

              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>

              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex items-center mb-6">

                <div className="bg-white p-2 rounded-lg shadow-sm mr-4">

                  <Smartphone className="text-emerald-600" size={24} />

                </div>

                <div>

                  <p className="font-bold text-emerald-900">M-Pesa STK Push</p>

                  <p className="text-xs text-emerald-700">Pay securely with Safaricom</p>

                </div>

              </div>



              <div className="space-y-2">

                <Label htmlFor="phone" className="text-gray-700 font-semibold">M-Pesa Number</Label>

                <Input 

                  id="phone" 

                  placeholder="07XXXXXXXX" 

                  {...register("phone")}

                  className={`text-lg py-6 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}

                />

                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}

                <p className="text-xs text-gray-500">Enter the Safaricom number that will receive the payment request.</p>

              </div>

            </div>



            {/* Terms */}

            <div className="flex items-start space-x-3 mb-8">

              <Checkbox 

                id="terms" 

                checked={termsAccepted}

                onCheckedChange={(checked) => setValue("terms", checked as true, { shouldValidate: true })}

                className="mt-1"

              />

              <div className="leading-none">

                <label

                  htmlFor="terms"

                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

                >

                  I agree to the Terms & Conditions and Privacy Policy.

                </label>

                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}

              </div>

            </div>



            {/* Order Summary */}

            <div className="border-t border-gray-100 pt-6 mb-8">

              <div className="flex justify-between text-sm mb-2">

                <span className="text-gray-500">Insurance Premium</span>

                <span className="font-medium text-gray-900">KES {price.toLocaleString()}</span>

              </div>

              <div className="flex justify-between text-sm mb-4">

                <span className="text-gray-500">Processing Fee</span>

                <span className="font-medium text-gray-900">KES 0</span>

              </div>

              <div className="flex justify-between items-center text-lg font-bold">

                <span className="text-gray-900">Total Payable</span>

                <span className="text-emerald-600">KES {price.toLocaleString()}</span>

              </div>

            </div>



            <Button 

              type="submit" 

              disabled={!isValid || isLoading}

              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all"

            >

              {isLoading ? "Processing..." : `Pay KES ${price.toLocaleString()}`}

            </Button>

          </form>

        </motion.div>

      </div>

    </div>

  );

}
