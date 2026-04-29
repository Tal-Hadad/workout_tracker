"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useExercises } from "@/app/hooks/exercises";
import AddExerciseButton from "@/app/components/exercises/addexercisebutton/AddExerciseButton";
import SearchBar from "../components/exercises/searchbar/SearchBar";
import FilterButton, {
  ExerciseFilters,
} from "../components/exercises/filterbutton/FilterButton";
import SortButton, {
  SortOrder,
} from "../components/exercises/sortbutton/SortButton";

export default function ExercisesList() {
  const { exercises, loading, error, refetch } = useExercises();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ExerciseFilters>({
    bodyParts: [],
    categories: [],
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>Error: {error}</p>;

  const normalizedQuery = query.trim().toLowerCase();
  const filteredExercises = exercises
    .filter((exercise) => {
      if (
        normalizedQuery &&
        !exercise.name.toLowerCase().includes(normalizedQuery) &&
        !exercise.bodyPart.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      if (
        filters.bodyParts.length > 0 &&
        !filters.bodyParts.includes(exercise.bodyPart)
      ) {
        return false;
      }
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(exercise.category)
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      if (sortOrder === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Exercises</h1>
      </div>
      <div className={styles.searchContainer}>
        <SearchBar value={query} onChange={setQuery} />
        <SortButton order={sortOrder} onChange={setSortOrder} />
        <FilterButton filters={filters} onChange={setFilters} />
      </div>
      <div>
        <AddExerciseButton onAdd={refetch} />
      </div>
      {filteredExercises.map((exercise) => (
        <div key={exercise._id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>{exercise.name}</h2>
            <span className={styles.category}>{exercise.category}</span>
          </div>
          <p className={styles.bodyPart}>{exercise.bodyPart}</p>
        </div>
      ))}
    </div>
  );
}
