'use client';

import { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Terms of Use</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Candle Recall Terms of Use
          </h1>

          <div className="space-y-6 text-gray-700">
            <p>
              By using Candle Recall (the &quot;Platform&quot;), you agree to these Terms of Use (&quot;Terms&quot;). If you
              disagree, please do not use our services. Candle Recall is operated by App Merchant, Inc.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Key Disclaimer and User Notice
              </h2>
              <p className="mb-4">
                Candle Recall offers general historical stock market data analysis for entertainment only. We do
                not provide personalized investment advice and are not affiliated with any financial institution.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                We do not access your brokerage accounts and never require login or trading permissions.
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Permitted Use</h2>
              <p className="mb-4">
                You may use Candle Recall to view and analyze historical candlestick data and conduct
                personal research. However, you may not rely on it for investment decisions or duplicate our
                content.
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">Account Management</h3>
              <p>
                You are responsible for securing your login credentials. Subscription billing is managed via
                Stripe, and by subscribing, you agree to their terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content and design elements of Candle Recall are our intellectual property. No ownership is
                transferred through use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                We are not liable for investment losses, technical errors, or service interruptions. Use of our
                platform is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which App Merchant, Inc. operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of the platform after
                changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
              <p>
                For questions regarding these Terms, please contact us at support@candlerecall.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
