'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleResendCode = () => {
    // TODO: Implement resend code functionality
    console.log('Resend code clicked');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with code and password verification
    console.log('Delete account confirmed with code:', code, 'and password:', password);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      {/* Modal Container */}
      <div className={`relative w-full max-w-lg mx-4 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-[#18181B]' : 'bg-white'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-1 rounded-lg transition-colors ${
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

        {/* Modal Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-2">Delete account</h2>
          <p className="text-sm text-muted-foreground mb-6">Are you sure?</p>

          {/* Code from email */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Code from email</label>
              <button
                onClick={handleResendCode}
                className="text-sm text-primary hover:underline"
              >
                Resend code
              </button>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code from your email"
              className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${
                isDarkMode
                  ? 'bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary'
                  : 'bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-primary'
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors pr-12 ${
                  isDarkMode
                    ? 'bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary'
                    : 'bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Warning message */}
          <div className={`mb-3 p-3 text-center`}>
            <p className="text-md text-muted-foreground">
              Deleting your account is permanent and cannot be undone.
            </p>
          </div>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            disabled={!code || !password}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-destructive-foreground text-destructive hover:bg-destructive hover:text-white disabled:bg-destructive-foreground disabled:text-destructive disabled:cursor-not-allowed disabled:hover:bg-destructive-foreground disabled:hover:text-destructive rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
