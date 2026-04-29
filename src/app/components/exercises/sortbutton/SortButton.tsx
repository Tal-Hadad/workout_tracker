"use client";
import styles from "./SortButton.module.css";

export type SortOrder = "asc" | "desc";

interface SortButtonProps {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
}

export default function SortButton({ order, onChange }: SortButtonProps) {
  function handleClick() {
    onChange(order === "asc" ? "desc" : "asc");
  }

  return (
    <button
      className={styles.sortBtn}
      onClick={handleClick}
      aria-label="Sort exercises alphabetically"
      title={order === "asc" ? "Sort Z → A" : "Sort A → Z"}
    >
      <span className="material-symbols-outlined">
        {order === "desc" ? "arrow_drop_up" : "arrow_drop_down"}
      </span>
    </button>
  );
}
