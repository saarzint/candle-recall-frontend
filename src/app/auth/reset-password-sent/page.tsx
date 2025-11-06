'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from '@/assets/icons/icon.svg';

function ResetPasswordSentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'example@gmail.com';
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendLink = () => {
    if (canResend) {
      // TODO: Implement resend logic
      console.log('Resending link to:', email);
      setCountdown(60);
      setCanResend(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

          {/* Reset Password Title */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">Reset your password</h3>
            <p className="text-sm text-gray-600">
              We&apos;ve sent you a link to{' '}
              <span className="font-medium text-foreground">{email}</span> to reset your
              password. Please check your email.
            </p>
          </div>

          {/* Change Email Link */}
          <div className="text-center mb-4">
            <span className="text-sm text-gray-600">Not your Email? </span>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-foreground underline hover:text-muted-foreground"
            >
              Change email
            </Link>
          </div>

          {/* Resend Link Button */}
          <button
            onClick={handleResendLink}
            disabled={!canResend}
            className={`w-full font-medium py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 mb-4 ${
              canResend
                ? 'bg-secondary text-foreground hover:bg-gray-300 focus:ring-gray-300 border border-gray-300'
                : 'bg-secondary text-gray-400 cursor-not-allowed border border-gray-300'
            }`}
          >
            {canResend ? 'Resend Link' : `Resend Link (${formatTime(countdown)})`}
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
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-500">
        Not affiliated with TD Ameritrade, Charles Schwab, or OpenAI. Not investment advice. For entertainment purposes only.
      </footer>
    </div>
  );
}

export default function ResetPasswordSentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-body-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordSentContent />
    </Suspense>
  );
}
