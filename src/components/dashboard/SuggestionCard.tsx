interface SuggestionCardProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export default function SuggestionCard({ icon, text, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left w-full"
    >
      <div className="flex-shrink-0 text-gray-600 mt-0.5">{icon}</div>
      <p className="text-sm text-gray-700">{text}</p>
    </button>
  );
}
