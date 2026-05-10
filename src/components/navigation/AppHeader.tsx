import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BOOKS_MAP } from "@/constants/bible/books";
import { colors } from "@/constants/theme/colors";

export default function AppHeader() {
  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // REMOVE BARRAS
  const segments = pathname.split("/").filter(Boolean);

  const isHome = pathname === "/";
  const canGoBack = !isHome;

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }

  function getTitle() {
    // HOME
    if (pathname === "/") {
      return "Home";
    }

    // BOOKS
    if (pathname.includes("/books")) {
      return "Livros";
    }

    // CHAPTERS
    if (pathname.includes("/chapters/")) {
      const book = segments[segments.length - 1];

      return BOOKS_MAP[book]?.name ?? "Capítulos";
    }

    // VERSES
    if (pathname.includes("/verses/")) {
      const book = segments[segments.length - 2];
      const chapter = segments[segments.length - 1];

      return `${BOOKS_MAP[book]?.name ?? book} ${chapter}`;
    }

    // READING
    if (pathname.includes("/reading/")) {
      const book = segments[segments.length - 2];
      const chapter = segments[segments.length - 1];

      return `${BOOKS_MAP[book]?.name ?? book} ${chapter}`;
    }

    return "Bíblia";
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: colors.background,
        borderBottomWidth: 0.5,
        borderBottomColor: "#222",
      }}
    >
      <View
        style={{
          height: 56,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 12,
        }}
      >
        {/* LEFT */}
        <View
          style={{
            width: 48,
            alignItems: "flex-start",
          }}
        >
          {canGoBack ? (
            <TouchableOpacity
              onPress={handleBack}
              style={{ padding: 6 }}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => (navigation as any).openDrawer()}
              style={{ padding: 6 }}
            >
              <Ionicons
                name="menu"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* CENTER */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: colors.text,
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            {getTitle()}
          </Text>
        </View>

        {/* RIGHT */}
        <View
          style={{
            width: 48,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity style={{ padding: 6 }}>
            <Ionicons
              name="search"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}