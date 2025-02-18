import styles from "./input.module.css";

interface InputProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function Input({
  className = "",
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <input
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
