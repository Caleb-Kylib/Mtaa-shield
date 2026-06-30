import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Sign In | Mtaa Shield',
  description: 'Sign in to manage your microinsurance policies.',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
