'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/assets/icons/icon.svg';
import { Input } from '@/components/ui';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement password reset logic
    console.log('Setting new password:', newPassword);

    // Redirect to login or success page
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-body-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-8 gap-3">
            <Image src={Icon} alt="Candle Recall" width={32} height={32} />
            <h2 className="text-2xl font-bold text-foreground">Candle Recall</h2>
          </div>

          {/* Set New Password Title */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">Set new password</h3>
            <p className="text-sm text-gray-600">
              Choose a password for the account. A password must contain at least 8 characters.
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Field */}
            <Input
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              validate="password"
              minLength={8}
              showPasswordToggle
              isPasswordVisible={showNewPassword}
              onTogglePassword={() => setShowNewPassword(!showNewPassword)}
              required
            />

            {/* Confirm Password Field */}
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              validate={(value) => {
                if (value !== newPassword) return 'Passwords do not match.';
                return undefined;
              }}
              showPasswordToggle
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Continue
            </button>

            {/* Back to Top link */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-primary hover:underline"
              >
                Back to Top
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
