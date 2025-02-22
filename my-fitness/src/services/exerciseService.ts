import { ExerciseWithSets } from "@/types/models";
import { getSetTotalWeight } from "./setServices";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce(
    (total, set) => total + getSetTotalWeight(set),
    0
  );
};
