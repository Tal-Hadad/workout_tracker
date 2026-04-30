import styles from "./ExerciseToolbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import SortButton, { SortOrder } from "../sortbutton/SortButton";
import FilterButton, { ExerciseFilters } from "../filterbutton/FilterButton";
import AddExerciseButton from "../addexercisebutton/AddExerciseButton";

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  sortOrder: SortOrder;
  onSortChange: (o: SortOrder) => void;
  filters: ExerciseFilters;
  onFiltersChange: (f: ExerciseFilters) => void;
  onAdd: () => void;
}

export default function ExerciseToolbar({
  query,
  onQueryChange,
  sortOrder,
  onSortChange,
  filters,
  onFiltersChange,
  onAdd,
}: Props) {
  return (
    <>
      <div className={styles.searchContainer}>
        <SearchBar value={query} onChange={onQueryChange} />
        <SortButton order={sortOrder} onChange={onSortChange} />
        <FilterButton filters={filters} onChange={onFiltersChange} />
      </div>
      <div>
        <AddExerciseButton onAdd={onAdd} />
      </div>
    </>
  );
}
