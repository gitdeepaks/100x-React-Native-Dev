import "./global.css";
import { StyleSheet, Text, View, FlatList } from "react-native";
import FeedPostItem from "@/components/FeedPostItem";
import dummyPosts from "@/dummyPosts";

export default function App() {
  return (
    <View style={styles.constainer}>
      <FlatList
        data={dummyPosts}
        renderItem={({ item }) => <FeedPostItem post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 80,
  },
});
