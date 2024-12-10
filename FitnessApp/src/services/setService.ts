import { ExerciseSet, ExerciseWithSets } from "@/types/models";
import * as Crypto from "expo-crypto";

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.oneRM || 0) > (bestSet?.oneRM || 0) ? set : bestSet;
  }, null);
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const createSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId,
  };
  return newSet;
};

export const updateSets = (
  set: ExerciseSet,
  updatedFields: Pick<ExerciseSet, "reps" | "weight">
) => {
  const updateSet = { ...set };

  if (updatedFields.reps !== undefined) {
    updateSet.reps = updatedFields.reps;
  }

  if (updatedFields.weight !== undefined) {
    updateSet.weight = updatedFields.weight;
  }

  if (updateSet.weight !== undefined && updateSet.reps !== undefined) {
    updateSet.oneRM = updateSet.weight * (36.0 / (37.0 - updateSet.reps));
  }

  return updateSet;
};

const isSetCompleted = (set: ExerciseSet) => {
  return set.reps && set.reps > 0;
};

export const cleanSets = (sets: ExerciseSet[]) => {
  return sets.filter(isSetCompleted);
};
