import { View, Image as NativeImage } from "react-native";
import React from "react";
import { Link, useLocalSearchParams, Stack, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { getMediaType } from "../utils/media";
import { ResizeMode, Video } from "expo-av";
import { VideoView, useVideoPlayer } from "expo-video";
import * as MediaLib from "expo-media-library";

export default function Image() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const [permissionResponse, requestPersmission] = MediaLib.usePermissions();

  const fullUri = (FileSystem.documentDirectory || "") + (name || "");

  const player = useVideoPlayer(fullUri, (player) => {
    player.loop == true;
    player.play;
  });

  const type = getMediaType(fullUri);

  async function onSave() {
    if (permissionResponse?.status !== "granted") {
      await requestPersmission();
    }
    const asset = await MediaLib.createAssetAsync(fullUri);
  }

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
                onPress={onSave}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />
      {type === "image" && (
        <NativeImage
          source={{ uri: fullUri }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {type === "video" && (
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          // source={{ uri: fullUri }}
          // resizeMode={ResizeMode.COVER}
          // shouldPlay
        />
      )}

      <Link href="/">Home</Link>
    </View>
  );
}
