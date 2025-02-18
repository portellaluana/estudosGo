import styles from "./checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label className={`${styles.text}`}>{label}</label>
    </>
  );
}
