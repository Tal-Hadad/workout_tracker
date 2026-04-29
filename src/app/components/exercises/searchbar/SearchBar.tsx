import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search exercises"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
