'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-[#18181B]' : 'bg-white'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-1 rounded-lg transition-colors z-10 ${
            isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto max-h-[90vh] p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h2>

          <div className="space-y-6 text-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Candle Recall, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Description of Service</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Candle Recall provides AI-powered market analysis and trading insights. Our service includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Market data analysis and visualization</li>
                <li>AI-generated trading insights and suggestions</li>
                <li>Personalized trading strategies</li>
                <li>Historical data tracking and trends</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Important Disclaimers</h3>
              <div className={`p-4 rounded-lg mb-3 ${isDarkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                <p className="text-sm font-semibold mb-2">NOT INVESTMENT ADVICE</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Candle Recall is provided for informational and entertainment purposes only. Nothing on this platform
                  constitutes financial, investment, legal, or tax advice. You should consult with appropriate professionals
                  before making any financial decisions.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                <p className="text-sm font-semibold mb-2">NO AFFILIATIONS</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Candle Recall is not affiliated with, endorsed by, or connected to TD Ameritrade, ThinkOrSwim,
                  Charles Schwab, OpenAI, or any other financial institution or trading platform.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Account Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Candle Recall does <strong>NOT</strong> connect to, access, or require authentication with your
                personal brokerage accounts. You only log in to Candle Recall for your subscription, saved research,
                and personalized features.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. User Responsibilities</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                As a user of Candle Recall, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not attempt to reverse engineer or exploit the service</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">6. Data and Market Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                Market data provided through Candle Recall may be delayed and should not be considered real-time.
                We make no guarantees about the accuracy, completeness, or timeliness of any data or information
                provided through our service.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">7. Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Candle Recall and its operators shall not be liable for any direct, indirect, incidental, special,
                or consequential damages resulting from the use or inability to use our service, including but not
                limited to trading losses, lost profits, or data loss.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">8. Subscription and Billing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Subscription fees are billed in advance on a recurring basis. You may cancel your subscription at any
                time through your account settings. Refunds are subject to our refund policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">9. Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these terms
                or for any other reason at our sole discretion. You may delete your account at any time through
                your account settings.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">10. Changes to Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes
                via email or through the service. Your continued use of the service after such changes constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">11. Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                which Candle Recall operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">12. Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us through our support page.
              </p>
            </section>

            {/* Disclaimer */}
            <div className={`mt-8 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <p className="text-xs text-muted-foreground text-center">
                Not affiliated with TD Ameritrade, Charles Schwab, or OpenAI.
                Not investment advice. For entertainment purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
