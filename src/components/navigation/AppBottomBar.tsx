import { Ionicons } from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  usePathname,
  useRouter,
} from "expo-router";

import {
  useMemo,
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

import VerseActionBar from "@/components/bible/VerseActionBar";

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

  // =====================================
  // STORE
  // =====================================

  const lastReading =
    useReadingStore(
      (state) =>
        state.lastReading
    );

  const selectedVerse =
    useReadingStore(
      (state) =>
        state.selectedVerse
    );

  // =====================================
  // ROUTES
  // =====================================

  const isHome =
    pathname === "/" ||
    pathname === "/index";

  const isReading =
    pathname.includes(
      "/reading/"
    );

  // =====================================
  // READING DATA
  // =====================================

  const reading =
    useMemo(() => {
      return {
        book:
          lastReading?.book ??
          "gn",

        chapter:
          lastReading?.chapter ??
          1,

        verse:
          lastReading?.verse ??
          1,

        version:
          lastReading?.version ??
          "NVI",
      };
    }, [lastReading]);

  // =====================================
  // LABELS
  // =====================================

  const bookLabel =
    BOOKS_MAP[
      reading.book
    ]?.name ??
    reading.book;

  // =====================================
  // ACTION BAR
  // =====================================

  const hideBottomBar =
    isReading &&
    !!selectedVerse;

  // =====================================
  // NAVIGATION
  // =====================================

  function goHome() {
    if (!isHome) {
      router.push("/");
    }
  }

  function openDrawer() {
    (
      navigation as any
    ).openDrawer();
  }

  function openBooks() {
    router.push(
      "/books"
    );
  }

  function openChapters() {
    router.push(
      `/chapters/${reading.book}`
    );
  }

  function openVerse() {
    router.push({
      pathname:
        "/reading/[book]/[chapter]",

      params: {
        book:
          reading.book,

        chapter:
          String(
            reading.chapter
          ),

        verse:
          String(
            reading.verse
          ),
      },
    });
  }

  // =====================================
  // RENDER
  // =====================================

  return (
    <>
      {/* ACTION BAR */}
      {hideBottomBar && (
        <VerseActionBar />
      )}

      {/* NORMAL BAR */}
      <View
        style={{
          backgroundColor:
            colors.surface,

          borderTopWidth: 0.5,

          borderColor:
            "#222",

          paddingBottom:
            insets.bottom,

          opacity:
            hideBottomBar
              ? 0
              : 1,

          height:
            hideBottomBar
              ? 0
              : undefined,

          overflow:
            "hidden",
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
              onPress={goHome}
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
              onPress={
                openDrawer
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
              flex: 1,

              flexDirection:
                "row",

              alignItems:
                "center",

              marginLeft: 4,
            }}
          >
            {/* BOOK */}
            <TouchableOpacity
              onPress={
                openBooks
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
              onPress={
                openChapters
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
                {
                  reading.chapter
                }
              </Text>
            </TouchableOpacity>

            {/* VERSE */}
            <TouchableOpacity
              onPress={
                openVerse
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
                {
                  reading.verse
                }
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
                {
                  reading.version
                }
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
            {/* AUDIO */}
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

            {/* OPTIONS */}
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

      {/* BOTTOM SHEET */}
      <AppBottomSheet
        visible={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}