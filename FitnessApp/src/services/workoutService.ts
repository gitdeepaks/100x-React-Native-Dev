import { Workout, WorkoutWithExercises } from "@/types/models";
import {
  cleanExercise,
  getExerciseTotalWeight,
} from "@/services/exerciseService";
import * as Crypto from "expo-crypto";
import exercises from "@/data/exercises";
import { saveWorkout } from "@/db/workouts";

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0
  );
};

export const newWorkOut = async () => {
  const newWorkOut: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  // save to DB
  await saveWorkout(newWorkOut);
  return newWorkOut;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  // cleanup incomplete sets
  const cleanedWorkout = cleanupWorkout(workout);

  const finishedWorkout: WorkoutWithExercises = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };

  return finishedWorkout;
};

export const cleanupWorkout = (workout: WorkoutWithExercises) => {
  const cleanedExercises = workout.exercises
    .map(cleanExercise)
    .filter((e) => e !== null);

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};
