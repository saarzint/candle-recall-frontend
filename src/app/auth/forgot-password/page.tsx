'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/assets/icons/icon.svg';
import { Input } from '@/components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement forgot password logic
    console.log('Reset password for:', email);
    // Redirect to confirmation page with email
    router.push(`/auth/reset-password-sent?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-8 gap-3">
            <Image src={Icon} alt="Candle Recall" width={32} height={32} />
            <h2 className="text-2xl font-bold text-foreground">Candle Recall</h2>
          </div>

          {/* Reset Password Title */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">Reset your password</h3>
            <p className="text-sm text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validate="email"
              required
            />

            {/* Send Link Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Send Link
            </button>

            {/* Back to Login link */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-primary hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-500">
        Not affiliated with TD Ameritrade, Charles Schwab, or OpenAI. Not investment advice. For entertainment purposes only.
      </footer>
    </div>
  );
}
