'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts';
import Image from 'next/image';
import SendIcon from '@/assets/icons/send.svg';
import AttachmentIcon from '@/assets/icons/attachment.svg';

interface FAQItem {
  question: string;
  answer: string;
}

export default function SupportPage() {
  const [message, setMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What exactly is Candle Recall?',
      answer: 'Candle Recall is an AI-powered platform designed to help traders and investors analyze market data, track trends, and make informed decisions. It provides personalized insights based on your trading preferences and historical data.'
    },
    {
      question: 'Can Candle Recall access my brokerage account?',
      answer: 'No, Candle Recall does not connect to, access, or require authentication with your personal brokerage accounts. You only log in to Candle Recall for your subscription, saved research, and personalized features.'
    },
    {
      question: 'Is Candle Recall affiliated with TD Ameritrade, ThinkOrSwim, Charles Schwab, OpenAI, or any other financial institution?',
      answer: 'No, Candle Recall is an independent platform and is not affiliated with TD Ameritrade, ThinkOrSwim, Charles Schwab, OpenAI, or any other financial institution. It is provided for informational and entertainment purposes only.'
    },
    {
      question: 'Does Candle Recall provide real-time market data?',
      answer: 'Candle Recall provides market analysis and insights based on available data sources. For the most up-to-date information on data feeds and latency, please refer to our documentation or contact support.'
    },
    {
      question: 'Does Candle Recall support international stock markets?',
      answer: 'Candle Recall primarily focuses on U.S. stock markets. Support for international markets may be added in future updates. Check our roadmap for upcoming features.'
    },
    {
      question: 'Can I use Candle Recall outside the United States?',
      answer: 'Yes, Candle Recall can be accessed from anywhere in the world with an internet connection. However, market data and features are primarily focused on U.S. markets.'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement chat functionality
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <DashboardLayout title="Support & FAQ">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-2">Welcome to support</h2>
          </div>

          {/* Chat Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Chat</h3>
            <div className="relative flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3.5 shadow-sm">
              <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary text-primary hover:bg-primary/20 rounded-lg transition-colors">
                <Image
                  src={AttachmentIcon}
                  alt="Attach file"
                  width={20}
                  height={20}
                />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Ask
                <Image src={SendIcon} alt="Send" width={16} height={16} />
              </button>
            </div>
          </div>

          {/* FAQ Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">FAQ</h2>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-sidebar-foreground transition-colors"
                >
                  <span className="text-sm font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`flex-shrink-0 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    />
                  </svg>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
