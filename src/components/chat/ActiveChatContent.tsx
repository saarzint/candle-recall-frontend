'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ChatMessage from './ChatMessage';
import PromptInput from '../dashboard/PromptInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ActiveChatContentProps {
  chatId: string;
  initialMessages?: Message[];
}

export default function ActiveChatContent({
  chatId,
  initialMessages = [],
}: ActiveChatContentProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePromptSubmit = (value: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: value,
    };

    setMessages((prev) => [...prev, userMessage]);

    // TODO: Implement API call to get AI response
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'This is a sample AI response. In production, this would be replaced with actual AI-generated content.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div
        className={`px-6`}
      >
        <div className="max-w-3xl mx-auto">
          <PromptInput
            onSubmit={handlePromptSubmit}
            placeholder="Ask anything..."
          />  
        </div>
      </div>
    </div>
  );
}
