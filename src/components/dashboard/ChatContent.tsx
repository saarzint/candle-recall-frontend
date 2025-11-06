'use client';

import Image from 'next/image';
import Icon from '@/assets/icons/icon.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import SuggestionCard from './SuggestionCard';
import PromptInput from './PromptInput';

interface ChatContentProps {
  userName?: string;
}

export default function ChatContent({ userName = 'Nick' }: ChatContentProps) {
  const suggestions = [
    {
      id: 1,
      text: 'Consider using a tool like TradeSmart for real-time market insights.',
    },
    {
      id: 2,
      text: 'You might find the Market Maven helpful for tracking stock trends.',
    },
    {
      id: 3,
      text: "How about trying the Trader's Compass for personalized trading strategies?",
    },
  ];

  const handlePromptSubmit = (value: string) => {
    // TODO: Implement chat message submission logic
    console.log('User prompt:', value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Logo and Brand */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8 flex items-center gap-4">
        <Image src={Icon} alt="Candle Recall" width={48} height={48} />
        <h1 className="text-3xl font-bold text-foreground">Candle Recall</h1>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2">
          Hi, {userName}!
        </h2>
        <h2 className="text-4xl font-bold text-foreground mb-2">
          Ready to trade smarter?
        </h2>
      </div>

      {/* Suggestions Section */}
      <div className="w-full">
        <div className="mb-4">
          <p className="text-sm text-gray-600">For you</p>
        </div>

        <div className="space-y-3 mb-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              icon={<Image src={SparkleIcon} alt="Sparkle" width={18} height={18} />}
              text={suggestion.text}
              onClick={() => console.log('Suggestion clicked:', suggestion.id)}
            />
          ))}
        </div>

        <PromptInput
          onSubmit={handlePromptSubmit}
          placeholder="Analyze AAPL price trends for past year..."
        />
      </div>
    </div>
  );
}
