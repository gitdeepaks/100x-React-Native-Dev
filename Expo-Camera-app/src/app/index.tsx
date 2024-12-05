import React, { useCallback, useEffect, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

interface Media {
  name: string;
  uri: string;
}

export default function HomeScreen() {
  const [images, setImages] = useState<Media[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    setImages(
      res.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      }))
    );
  };

  console.log(JSON.stringify(images, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={3}
        data={images}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 1 }}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
              <Image
                source={{ uri: item.uri }}
                style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
              />
            </Pressable>
          </Link>
        )}
      />

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
