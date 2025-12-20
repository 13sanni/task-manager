interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`px-4 py-2 rounded font-medium transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
