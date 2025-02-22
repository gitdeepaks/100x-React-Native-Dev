import { WorkoutWithExercises } from "@/types/models";
import { getExerciseTotalWeight } from "./exerciseService";

export const getWorkOutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};
