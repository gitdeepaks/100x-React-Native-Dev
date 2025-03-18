import { Modal, Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "@/components/general/Themed";
import React from "react";
import CustomButton from "../general/CustomButton";
import Card from "../general/Card";
import AntDesign from "@expo/vector-icons/AntDesign";
import exercises from "@/data/exercises";
import { FlatList } from "react-native-gesture-handler";

type SelectExreciseModalProps = {
  onSelectExercise?: (name: string) => void;
};

export default function SelectExreciseModal({
  onSelectExercise,
}: SelectExreciseModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filterExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <CustomButton
        onPress={() => setIsOpen(true)}
        title="Select Exercise"
        style={{ marginBottom: 15 }}
      />

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Card title="Select Exercise" style={styles.modalContent}>
            <AntDesign
              name="close"
              onPress={() => setIsOpen(false)}
              size={20}
              color="gray"
              style={styles.closeIcon}
            />
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
            <FlatList
              data={filterExercises}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectExercise?.(item.name);
                    setIsOpen(false);
                  }}
                  style={{ gap: 5 }}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ color: "gray" }}>{item.muscle}</Text>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    padding: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    marginVertical: 10,
  },
});
