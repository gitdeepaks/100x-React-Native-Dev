import { Link, router } from "expo-router";
import { View, Text } from "@/components/general/Themed";
import CustomButton from "@/components/general/CustomButton";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import { FlatList } from "react-native";

import { create } from "zustand";
import { useWorkout } from "@/hooks";

export default function HomeScreen() {
  const currentWorkout = useWorkout((s) => s.currentWorkout);
  const starteWorkOut = useWorkout((s) => s.startWorkOut);
  const workouts = useWorkout((s) => s.workouts);

  const onStartWorkout = () => {
    starteWorkOut();
    router.push("/workout/current");
  };
  console.log(currentWorkout);

  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
      }}
    >
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume workout" />
        </Link>
      ) : (
        <CustomButton title="Start New Workout" onPress={onStartWorkout} />
      )}
      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// interface State {
//   count: number;
//   name: string;
// }

// interface Action {
//   resetCount: () => void;
//   setName: (name: string) => void;
//   increaseCount: () => void;
//   decreaseCount: () => void;
// }

// const useStore = create<State & Action>()((set, get) => {
//   return {
//     count: 10,
//     name: "Deepak",

//     resetCount: () => {
//       set({ count: 0 });
//     },
//     setName: (name) => {
//       set({ name });
//     },

//     increaseCount: () => {
//       // const prev = get().count;
//       // set({ count: prev + 1 });

//       set((state) => ({ count: state.count + 1 }));
//     },
//     decreaseCount: () => {
//       set((state) => ({ count: state.count - 1 }));
//     },
//   };
// });

// const Name = () => {
//   const name = useStore((state) => state.name);
//   console.log("Rerender Name");

//   return <Text style={{ fontSize: 50 }}>{name}</Text>;
// };

// const Counter = () => {
//   const count = useStore((state) => state.count);
//   console.log("Counter Rerender");
//   return <Text style={{ fontSize: 50 }}>{count}</Text>;
// };

// const resetCount = useStore((state) => state.resetCount);
// const increaseCount = useStore((state) => state.increaseCount);
// const decreaseCount = useStore((state) => state.decreaseCount);
// const setName = useStore((s) => s.setName);
// console.log("Rerender HomeScreen");
// return (
//   <View style={{ flex: 1, gap: 10 }}>
//     <Counter />
//     <Name />
//     <CustomButton title="Reset" onPress={() => resetCount()} />
//     <CustomButton title="Increase" onPress={() => increaseCount()} />
//     <CustomButton title="Decrease" onPress={() => decreaseCount()} />
//     <CustomButton title="SetName" onPress={() => setName("Hola")} />
//   </View>
// );
