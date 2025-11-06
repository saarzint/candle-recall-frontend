'use client';

import { useState } from 'react';
import Image from 'next/image';
import AttachmentIcon from '@/assets/icons/attachment.svg';
import SendIcon from '@/assets/icons/send.svg';

interface PromptInputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export default function PromptInput({
  onSubmit,
  placeholder = 'Analyze AAPL price trends for past year...',
}: PromptInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3.5 shadow-md hover:shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {/* Attachment Button */}
        <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary hover:bg-primary/20 rounded-lg transition-colors">
          <Image src={AttachmentIcon} alt="Attach file" width={20} height={20} />
        </button>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex-shrink-0 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
        >
          Ask
          <Image src={SendIcon} alt="Send" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
