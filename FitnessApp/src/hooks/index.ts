import { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { newWorkOut, finishWorkOut } from "@/services/workoutService";
interface State {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
}

interface Action {
  startWorkOut: () => void;
  finishWorkOut: () => void;
}
export const useWorkout = create<State & Action>()((set, get) => ({
  // State
  currentWorkout: null,
  workouts: [],

  //   Action

  startWorkOut: () => {
    set({ currentWorkout: newWorkOut() });
  },

  finishWorkOut: () => {
    const { currentWorkout } = get();

    if (!currentWorkout) {
      return;
    }

    const finishedWorkout = finishWorkOut(currentWorkout);

    set((state) => ({
      currentWorkout: null,
      workouts: [finishedWorkout, ...state.workouts],
    }));
  },
}));
