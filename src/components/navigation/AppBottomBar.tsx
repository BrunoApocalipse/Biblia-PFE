import { Ionicons } from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  usePathname,
  useRouter,
} from "expo-router";

import {
  useState,
} from "react";

import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import AppBottomSheet from "@/components/navigation/AppBottomSheet";

import {
  BOOKS_MAP,
} from "@/constants/bible/books";

import {
  colors,
} from "@/constants/theme/colors";

import {
  useReadingStore,
} from "@/store/useReadingStore";

export default function AppBottomBar() {
  const insets =
    useSafeAreaInsets();

  const navigation =
    useNavigation();

  const router =
    useRouter();

  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  const {
    lastReading,
  } = useReadingStore();

  const isHome =
    pathname === "/" ||
    pathname === "/index";

  // =====================================
  // LAST READING
  // =====================================

  const book =
    lastReading?.book ??
    "gn";

  const chapter =
    lastReading?.chapter ??
    1;

  const verse =
    lastReading?.verse ??
    1;

  const version =
    lastReading?.version ??
    "NVI";

  // =====================================
  // LABEL
  // =====================================

  const bookLabel =
    BOOKS_MAP[book]?.name ??
    book;

  return (
    <>
      <View
        style={{
          backgroundColor:
            colors.surface,

          paddingBottom:
            insets.bottom,

          borderTopWidth: 0.5,

          borderColor:
            "#222",
        }}
      >
        <View
          style={{
            height: 56,

            flexDirection:
              "row",

            alignItems:
              "center",

            paddingHorizontal: 6,
          }}
        >
          {/* LEFT */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",
            }}
          >
            {/* HOME */}
            <TouchableOpacity
              onPress={() => {
                if (!isHome) {
                  router.push("/");
                }
              }}
              style={{
                padding: 10,
              }}
            >
              <Ionicons
                name={
                  isHome
                    ? "home"
                    : "home-outline"
                }
                size={20}
                color={
                  isHome
                    ? "#fff"
                    : "#aaa"
                }
              />
            </TouchableOpacity>

            {/* MENU */}
            <TouchableOpacity
              onPress={() =>
                (
                  navigation as any
                ).openDrawer()
              }
              style={{
                padding: 10,
              }}
            >
              <Ionicons
                name="menu"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* CENTER */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              flex: 1,

              marginLeft: 4,
            }}
          >
            {/* BOOK */}
            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/books"
                )
              }
              style={{
                flex: 1,

                marginRight: 4,

                paddingVertical: 6,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#fff",

                  fontSize: 14,
                }}
              >
                {bookLabel}
              </Text>
            </TouchableOpacity>

            {/* CHAPTER */}
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/chapters/${book}`
                )
              }
              style={{
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                {chapter}
              </Text>
            </TouchableOpacity>

            {/* VERSE */}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname:
                    "/reading/[book]/[chapter]",

                  params: {
                    book,
                    chapter:
                      String(
                        chapter
                      ),
                    verse:
                      String(
                        verse
                      ),
                  },
                })
              }
              style={{
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  color: "#aaa",

                  fontSize: 12,
                }}
              >
                {verse}
              </Text>
            </TouchableOpacity>

            {/* VERSION */}
            <TouchableOpacity
              style={{
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",

                  fontSize: 12,
                }}
              >
                {version}
              </Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
              }}
            >
              <Ionicons
                name="volume-high"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() =>
                setOpen(true)
              }
            >
              <Ionicons
                name="ellipsis-vertical"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AppBottomSheet
        visible={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}