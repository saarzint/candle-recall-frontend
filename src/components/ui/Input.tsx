import React, { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
  rightElement?: React.ReactNode;
  // Validation props
  validate?: 'email' | 'password' | 'required' | ((value: string) => string | undefined);
  minLength?: number;
  customErrorMessage?: string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      showPasswordToggle = false,
      onTogglePassword,
      isPasswordVisible = false,
      rightElement,
      className = '',
      id,
      type = 'text',
      validate,
      minLength,
      customErrorMessage,
      validateOnBlur = true,
      validateOnChange = false,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const [internalError, setInternalError] = useState<string>('');
    const displayError = error || internalError;
    const hasError = !!displayError;

    const validateValue = (val: string): string | undefined => {
      // Custom validation function
      if (typeof validate === 'function') {
        return validate(val);
      }

      // Built-in validation rules
      if (validate === 'email') {
        if (!val) return customErrorMessage || 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(val)) {
          return customErrorMessage || 'Your email is invalid.';
        }
      }

      if (validate === 'password') {
        if (!val) return customErrorMessage || 'Password is required.';
        if (minLength && val.length < minLength) {
          return customErrorMessage || `Password must be at least ${minLength} characters.`;
        }
      }

      if (validate === 'required') {
        if (!val || val.trim() === '') {
          return customErrorMessage || 'This field is required.';
        }
      }

      return undefined;
    };

    const handleValidation = (val: string) => {
      if (validate) {
        const errorMsg = validateValue(val);
        setInternalError(errorMsg || '');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validateOnChange) {
        handleValidation(e.target.value);
      } else if (internalError) {
        // Clear error on change if there was one
        setInternalError('');
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validateOnBlur) {
        handleValidation(e.target.value);
      }
      onBlur?.(e);
    };

    // Clear internal error when external error is provided
    useEffect(() => {
      if (error) {
        setInternalError('');
      }
    }, [error]);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 transition-colors ${
              hasError
                ? 'border-destructive focus:ring-destructive text-destructive bg-destructive-foreground'
                : 'border-gray-300 focus:ring-primary text-foreground bg-white'
            } ${showPasswordToggle || rightElement ? 'pr-10' : ''} ${className}`}
            aria-invalid={hasError}
            aria-describedby={
              displayError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {showPasswordToggle && onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          )}
          {rightElement && !showPasswordToggle && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {displayError && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-destructive">
            {displayError}
          </p>
        )}
        {helperText && !displayError && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
