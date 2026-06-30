"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { axiosInstance } from '@/lib/axios';
import { motion } from 'framer-motion';

const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:4[0-3])|(?:9[0-9])|(?:5[7-9])|(?:6[8-9])|(?:8[0-9]))[0-9]{6})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(phoneRegex, { message: "Invalid Kenyan phone number" }),
  county: z.string().min(2, { message: "County is required" }),
  occupation: z.string().min(1, { message: "Please select an occupation" }),
  password: z.string().regex(passwordRegex, { message: "Password must be 8+ chars, include uppercase, lowercase, number and special char" }),
  confirmPassword: z.string(),
  terms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/auth/register', data);
      login(response.data.token, response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-h-[90vh] overflow-y-auto px-1 pb-4 scrollbar-hide"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-500">Join thousands of Africans protecting their livelihoods with Mtaa Shield.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="0712345678" {...register('phone')} className={errors.phone ? 'border-red-500' : ''} />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Input id="county" placeholder="Nairobi" {...register('county')} className={errors.county ? 'border-red-500' : ''} />
            {errors.county && <p className="text-red-500 text-xs">{errors.county.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <select 
            id="occupation" 
            {...register('occupation')}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.occupation ? 'border-red-500' : ''}`}
          >
            <option value="">Select your hustle</option>
            <option value="Farmer">Farmer</option>
            <option value="Boda Rider">Boda Rider</option>
            <option value="Market Trader">Market Trader</option>
            <option value="Small Vendor">Small Vendor</option>
          </select>
          {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} className={errors.password ? 'border-red-500' : ''} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register('confirmPassword')} className={errors.confirmPassword ? 'border-red-500' : ''} />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input 
            type="checkbox" 
            id="terms" 
            {...register('terms')}
            className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 mt-1"
          />
          <Label htmlFor="terms" className="font-normal text-sm cursor-pointer leading-tight">
            I agree to the Terms of Service and Privacy Policy.
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full font-normal">
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
