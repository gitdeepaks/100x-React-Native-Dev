import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router, Stack } from "expo-router";
import {
  useCameraPermissions,
  CameraView,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";

import * as Filesystem from "expo-file-system";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");

  const camera = useRef<CameraView>(null);

  const [picture, setPicture] = useState<CameraCapturedPicture>();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const toggleCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  async function takePicture() {
    const res = await camera.current?.takePictureAsync();

    setPicture(res);
  }

  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    await Filesystem.copyAsync({
      from: uri,
      to: Filesystem.documentDirectory + fileName,
    });

    setPicture(undefined);
    router.back();
  };
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: picture.uri }}
          style={{ width: "100%", flex: 1 }}
        />

        <View style={{ padding: 10 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture.uri)} />
          </SafeAreaView>
        </View>

        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: "absolute", top: 50, left: 20 }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View style={styles.footer}>
          <View />
          <Pressable
            style={styles.recordButton}
            onPress={takePicture}
          ></Pressable>

          <MaterialIcons
            onPress={toggleCamera}
            name="flip-camera-ios"
            size={24}
            color="white"
          />
        </View>
      </CameraView>

      <MaterialIcons
        name="close"
        color={"white"}
        style={styles.closeButton}
        size={30}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: { width: "100%", height: "100%" },
  closeButton: { position: "absolute", top: 50, left: 50 },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
