import { View, Image as NativeImage } from "react-native";
import React from "react";
import { Link, useLocalSearchParams, Stack, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";

export default function Image() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const fullUri = (FileSystem.documentDirectory || "") + (name || "");

  async function onDelete() {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Media",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={26}
                color="crimson"
              />
              <MaterialIcons
                onPress={() => {}}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />
      <NativeImage
        source={{ uri: fullUri }}
        style={{ width: "100%", height: "100%" }}
      />

      <Link href="/">Home</Link>
    </View>
  );
}
