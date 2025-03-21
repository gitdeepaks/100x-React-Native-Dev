import "../../global.css";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { AuthProvider } from "@/providers/AuthProvider";

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#252525",
  },
};

export default function RootLayout() {
  //   console.log("hello");
  return (
    <AuthProvider>
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Feed" }} />
          <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
