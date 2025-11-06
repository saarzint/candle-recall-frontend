interface SuggestionCardProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export default function SuggestionCard({ icon, text, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-sidebar-foreground transition-colors text-left w-full bg-background"
    >
      <div className="flex-shrink-0 text-muted-foreground mt-0.5">{icon}</div>
      <p className="text-sm text-foreground">{text}</p>
    </button>
  );
}
