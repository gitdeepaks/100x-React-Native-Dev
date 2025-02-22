import { ExerciseSet } from "@/types/models";

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce(
    (best: ExerciseSet | null, set) =>
      (set?.oneRM || 0) > (best?.oneRM || 0) ? set : best,
    null
  );
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set?.reps || 0);
};
