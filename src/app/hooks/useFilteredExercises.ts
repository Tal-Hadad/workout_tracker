import { useState, useMemo } from "react";
import { Exercise } from "./exercises";
import { ExerciseFilters } from "../components/exercises/filterbutton/FilterButton";
import { SortOrder } from "../components/exercises/sortbutton/SortButton";

export function useFilteredExercises(exercises: Exercise[]) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ExerciseFilters>({
    bodyParts: [],
    categories: [],
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return exercises
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
        const nameCompare =
          sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        if (nameCompare !== 0) return nameCompare;
        return a.category.localeCompare(b.category);
      });
  }, [exercises, query, filters, sortOrder]);

  return { query, setQuery, filters, setFilters, sortOrder, setSortOrder, filteredExercises };
}
