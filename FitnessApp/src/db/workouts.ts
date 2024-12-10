import { Workout } from "@/types/models";
import { getDb } from ".";

export const saveWorkout = async (workout: Workout) => {
  try {
    const db = await getDb();

    const res = db.runAsync(
      "INSERT INTO workout(id,created_at,finished_at) VALUES(?,?,?)",
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
