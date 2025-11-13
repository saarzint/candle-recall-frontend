'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  period: string;
  isCurrent?: boolean;
  renewsIn?: string;
}

interface PaymentMethod {
  type: string;
  last4: string;
  expiresMonth: string;
  expiresYear: string;
  isDefault: boolean;
}

interface Transaction {
  date: string;
  description: string;
  amount: number;
}

export default function BillingModal({ isOpen, onClose }: BillingModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [editingPaymentIndex, setEditingPaymentIndex] = useState<number | null>(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);

  const [plans] = useState<SubscriptionPlan[]>([
    {
      name: 'Basic plan',
      description: 'Some description',
      price: 15,
      period: 'per month',
      isCurrent: true,
      renewsIn: '14 days'
    },
    {
      name: 'Business plan',
      description: 'Some description',
      price: 25,
      period: 'per month'
    },
    {
      name: 'Enterprise plan',
      description: 'Some description',
      price: 50,
      period: 'per month'
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      type: 'Visa',
      last4: '2464',
      expiresMonth: 'May',
      expiresYear: '2029',
      isDefault: true
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      date: '05/14/2025',
      description: 'Basic plan',
      amount: 15.00
    },
    {
      date: '04/14/2025',
      description: 'Basic plan',
      amount: 15.00
    },
    {
      date: '03/14/2025',
      description: 'Basic plan',
      amount: 15.00
    }
  ]);

  const handleEditPayment = (index: number) => {
    setEditingPaymentIndex(index);
    setIsEditingPayment(true);
    const method = paymentMethods[index];
    setCardName('Nick Smith'); // TODO: Get actual cardholder name
    setCardNumber(`****-****-****-${method.last4}`);
    setExpiryDate('10/2030'); // TODO: Format from expiresMonth/expiresYear
    setCvv('');
  };

  const handleAddPayment = () => {
    setEditingPaymentIndex(null);
    setIsEditingPayment(true);
    setCardName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  const handleCancelEdit = () => {
    setIsEditingPayment(false);
    setEditingPaymentIndex(null);
    setCardName('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setShowCvv(false);
  };

  const handleSavePayment = () => {
    // TODO: Implement save payment method
    console.log('Saving payment method:', { cardName, cardNumber, expiryDate, cvv });
    handleCancelEdit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`relative w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl shadow-xl ${
          isDarkMode ? 'bg-[#18181B]' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Billing
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-sidebar-foreground transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content - Hidden scrollbar */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
          {/* Subscription Plans */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Subscription plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    plan.isCurrent
                      ? 'border-primary'
                      : isDarkMode
                      ? 'border-gray-700'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h4>
                    {plan.renewsIn && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        Renews in {plan.renewsIn}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  {plan.isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground cursor-not-allowed"
                    >
                      Current plan
                    </button>
                  ) : (
                    <button className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                      Upgrade plan
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Methods
              </h3>
              <button
                onClick={handleAddPayment}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add Payment Method
              </button>
            </div>

            {/* Payment Method Edit Form */}
            {isEditingPayment ? (
              <div className={`p-6 rounded-xl border ${
                isDarkMode ? 'border-gray-700 bg-[#1F1F23]' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Payment Method
                    </h4>
                    <p className="text-sm text-muted-foreground">Edit your payment method</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                        <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePayment}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="17 21 17 13 7 13 7 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="7 3 7 8 15 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Save
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Nick Smith"
                      className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDarkMode
                          ? 'bg-[#18181B] border-gray-700 text-white placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Card number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4444-4444-4444-4444"
                      maxLength={19}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
                        isDarkMode
                          ? 'bg-[#18181B] border-gray-700 text-white placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Exp. Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="10/2030"
                        maxLength={7}
                        className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
                          isDarkMode
                            ? 'bg-[#18181B] border-gray-700 text-white placeholder-gray-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type={showCvv ? 'text' : 'password'}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary ${
                            isDarkMode
                              ? 'bg-[#18181B] border-gray-700 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showCvv ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDarkMode ? 'border-gray-700 bg-[#27272A]' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {method.type} ending in {method.last4}
                    </div>
                    {method.isDefault && (
                      <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Expires {method.expiresMonth} {method.expiresYear}
                    </span>
                    <button
                      onClick={() => handleEditPayment(index)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-sidebar-foreground transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Transaction History */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Transaction History
            </h3>
            <div className={`rounded-xl border overflow-hidden ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-[#27272A]' : 'bg-gray-50'}>
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transaction.date}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transaction.description}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
