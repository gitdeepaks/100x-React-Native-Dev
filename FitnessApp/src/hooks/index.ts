import { ExerciseSet, WorkoutWithExercises } from "@/types/models";
import { finishWorkout, newWorkOut } from "@/services/workoutService";
import { createExercise } from "@/services/exerciseService";

import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { createSet, updateSets } from "@/services/setService";
import { current } from "immer";

interface State {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
}

interface Action {
  startWorkOut: () => void;
  finishWorkOut: () => void;
  addExercise: (name: string) => void;
  addset: (exerciseId: string) => void;
  updateSets: (
    setId: string,
    updatedFields: Pick<ExerciseSet, "reps" | "weight">
  ) => void;
  deleteSet: (setId: string) => void;
}
export const useWorkout = create<State & Action>()(
  immer((set, get) => ({
    // State
    currentWorkout: null,
    workouts: [],

    //   Action

    startWorkOut: async () => {
      const workout = await newWorkOut(); // Await the Promise
      set({ currentWorkout: workout });
    },

    finishWorkOut: async () => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }

      const finishedWorkout = await finishWorkout(currentWorkout); // Await the Promise

      set((state) => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout);
      });
    },

    addExercise: (name: string) => {
      const { currentWorkout } = get();
      if (!currentWorkout) {
        return;
      }
      const newExercise = createExercise(name, currentWorkout.id);

      set((state) => {
        state.currentWorkout?.exercises.push(newExercise);
      });

      // set((state) => ({
      //   currentWorkout: state.currentWorkout && {
      //     ...state.currentWorkout,
      //     exercises: [...state.currentWorkout?.exercises, newExercise],
      //   },
      // }));
    },
    addset: (exerciseId: string) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(
          (e) => e.id === exerciseId
        );

        exercise?.sets?.push(newSet);
      });
    },
    updateSets: (setId, updatedFields) => {
      set(({ currentWorkout }) => {
        if (!currentWorkout) {
          return;
        }

        // Find the exercise that contains the set
        const exercise = currentWorkout.exercises.find((ex) =>
          ex.sets.some((set) => set.id === setId)
        );

        if (!exercise) {
          return; // Exit if no such exercise exists
        }

        // Find the index of the set within the exercise
        const setIndex = exercise.sets.findIndex((set) => set.id === setId);

        if (!exercise || setIndex === undefined || setIndex === -1) {
          return;
        }

        // Update the set safely

        const updateSet = updateSets(
          current(exercise.sets[setIndex]),
          updatedFields
        );
        exercise.sets[setIndex] = updateSet;
      });
    },
    deleteSet: (setId) => {
      set(({ currentWorkout }) => {
        // Ensure currentWorkout is not null
        if (!currentWorkout) {
          return;
        }

        // Find the exercise containing the set
        const exercise = currentWorkout.exercises.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );

        if (!exercise) {
          return; // Exit if no such exercise exists
        }

        // Filter out the set with the given setId
        exercise.sets = exercise.sets.filter((set) => set.id !== setId);

        // If the exercise has no more sets, remove the exercise
        if (exercise.sets.length === 0) {
          currentWorkout.exercises = currentWorkout.exercises.filter(
            (ex) => ex.id !== exercise.id
          );
        }
      });
    },
  }))
);
