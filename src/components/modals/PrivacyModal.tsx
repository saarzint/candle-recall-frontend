'use client';

import { useTheme } from '@/contexts/ThemeContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
          <h2 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h2>

          <div className="space-y-6 text-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h3 className="text-xl font-semibold mb-3">1. Introduction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Candle Recall. We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Information We Collect</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Account information (username, email address, password)</li>
                <li>Profile information (profile picture, preferences)</li>
                <li>Usage data and analytics</li>
                <li>Communication data when you contact support</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. How We Use Your Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Third-Party Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                Candle Recall is an independent platform and is not affiliated with TD Ameritrade, ThinkOrSwim,
                Charles Schwab, OpenAI, or any other financial institution. We do not share your personal information
                with these or other third parties except as described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">6. Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">7. Cookies and Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">9. Contact Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our support page.
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
