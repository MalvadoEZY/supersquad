interface DividerProps {
  text?: string;
  className?: string;
  textClassName?: string;
  lineClassName?: string;
}

export default function Divider({ 
  text, 
  className = "relative my-2",
  textClassName = "px-4 text-white/50",
  lineClassName = "border-white/20"
}: DividerProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex-1 border-t ${lineClassName}`}></div>
      {text && (
        <span className={`text-sm ${textClassName}`}>{text}</span>
      )}
      <div className={`flex-1 border-t ${lineClassName}`}></div>
    </div>
  );
} 