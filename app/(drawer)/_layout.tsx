import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
      <Drawer.Screen name="settings" />
      <Drawer.Screen name="news" />
      <Drawer.Screen name="notes" />
    </Drawer>
  );
}