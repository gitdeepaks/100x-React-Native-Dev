import React from "react";
import { Link } from "expo-router";

import { View, Text } from "@/components/general/Themed";
import CustomButton from "@/components/general/CustomButton";
import Card from "@/components/general/Card";
import WorkOutListItem from "@/components/workouts/WorkOutListItem";

import workouts from "@/data/dummyWorkouts";
import { FlatList } from "react-native";

const workout = workouts[0];

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
      }}
    >
      <Link href="/workout/current" asChild>
        <CustomButton title="Start Current Workout" type="primary" />
      </Link>

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <WorkOutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
