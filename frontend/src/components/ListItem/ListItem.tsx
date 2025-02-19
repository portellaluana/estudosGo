import { ButtonDelete } from "../buttons/ButtonDelete";
import styles from "./listItem.module.css";

interface ListItemProps {
  id: number;
  name: string;
  status: string;
  stock: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export function ListItem({
  id,
  name,
  status,
  stock,
  onDelete,
  onEdit,
}: ListItemProps) {
  return (
    <li className={`${styles.listItem}`}>
      <span style={{ marginRight: "8px" }}>
        {id}: PRODUTO: {name} | ESTADO: {status} | ESTOQUE: {stock}
      </span>
      <ButtonDelete onClick={() => onDelete(id)} text="x" />
    </li>
  );
}
