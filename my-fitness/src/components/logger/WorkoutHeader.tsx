import { View, Text } from "@/components/general/Themed";
import React, { useEffect } from "react";

import dummyWorkouts from "@/data/dummyWorkouts";
import { calculateDuration, calculateDurationHoursMinutes } from "@/utils/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function WorkoutHeader() {
  const [timer, setTimer] = React.useState("0.00");

  const workout = dummyWorkouts[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = calculateDurationHoursMinutes(
        new Date(workout.createdAt),
        new Date()
      );
      setTimer(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [workout]);

  return (
    <View style={{ gap: 10, backgroundColor: "transparent", marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>WorkoutHeader</Text>
      <Text style={{ fontSize: 18 }}>
        <FontAwesome5 name="clock" size={18} color="gray" />

        {timer}
      </Text>
    </View>
  );
}
