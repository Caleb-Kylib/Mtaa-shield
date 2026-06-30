import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account | Mtaa Shield',
  description: 'Join Mtaa Shield to protect your livelihood.',
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
