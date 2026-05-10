import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useFonts,
} from "expo-font";

import {
  Stack,
} from "expo-router";

export default function RootLayout() {
  const [loaded] =
    useFonts({
      ...Ionicons.font,
    });

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,

        animation:
          "fade",
      }}
    >
      <Stack.Screen
        name="(drawer)"
      />
    </Stack>
  );
}