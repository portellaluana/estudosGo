import styles from "./input.module.css";

interface InputProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ className = "", value, onChange }: InputProps) {
  return (
    <input
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}
