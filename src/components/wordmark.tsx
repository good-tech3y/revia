export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight text-ink ${className}`}>
      revi<span className="text-clay">a</span>
    </span>
  );
}
