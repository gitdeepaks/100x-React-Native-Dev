import { Workout, WorkoutWithExercises } from "@/types/models";
import { getExerciseTotalWeight } from "@/services/exerciseService";
import * as Crypto from "expo-crypto";

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};

export const newWorkOut = () => {
  const newWorkOut: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  return newWorkOut;
};

export const finishWorkOut = (workout: WorkoutWithExercises) => {
  const finishedWorkout: WorkoutWithExercises = {
    ...workout,
    finishedAt: new Date(),
  };

  return finishedWorkout;
};
