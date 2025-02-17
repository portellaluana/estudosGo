import { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

export function Button({ text, icon, onClick, className = "" }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {icon}
      <span>{text}</span>
    </button>
  );
}
