import { Slot } from "expo-router";
import { View } from "react-native";

import AppBottomBar from "@/components/navigation/AppBottomBar";
import AppHeader from "@/components/navigation/AppHeader";
import { colors } from "@/constants/theme/colors";

export default function TabsLayout() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <AppHeader />

      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      <AppBottomBar />
    </View>
  );
}