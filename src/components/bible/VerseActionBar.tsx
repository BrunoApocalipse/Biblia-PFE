import { Ionicons } from "@expo/vector-icons";

import {
  useState,
} from "react";

import {
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import NotesModal from "@/components/bible/NotesModal";

import {
  BOOKS_MAP,
} from "@/constants/bible/books";

import {
  useReadingStore,
} from "@/store/useReadingStore";

export default function VerseActionBar() {
  const insets =
    useSafeAreaInsets();

  const [
    notesVisible,
    setNotesVisible,
  ] = useState(false);

  // =====================================
  // STORE
  // =====================================

  const selectedVerse =
    useReadingStore(
      (state) =>
        state.selectedVerse
    );

  const currentReading =
    useReadingStore(
      (state) =>
        state.currentReading
    );

  const clearSelection =
    useReadingStore(
      (state) =>
        state.clearSelection
    );

  // =====================================
  // GUARD
  // =====================================

  if (
    !selectedVerse ||
    !currentReading
  ) {
    return null;
  }

  // =====================================
  // DATA
  // =====================================

  const bookLabel =
    BOOKS_MAP[
      selectedVerse.book
    ]?.name ??
    selectedVerse.book;

  const reference =
    `${bookLabel} ${selectedVerse.chapter}:${selectedVerse.verse}`;

  const verseText =
    currentReading.verseText ??
    "";

  const formattedText =
    `${reference}\n\n${verseText}`;

  // =====================================
  // ACTIONS
  // =====================================

  async function handleCopy() {
    await Clipboard.setStringAsync(
      formattedText
    );

    clearSelection();
  }

  async function handleShare() {
    await Share.share({
      message:
        formattedText,
    });

    clearSelection();
  }

  function handleOpenNotes() {
    setNotesVisible(true);
  }

  function handleCloseNotes() {
    setNotesVisible(false);
  }

  return (
    <>
      <View
        style={{
          backgroundColor:
            "#181818",

          borderTopWidth: 0.5,

          borderColor:
            "#222",

          paddingBottom:
            insets.bottom,
        }}
      >
        <View
          style={{
            height: 58,

            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-around",

            paddingHorizontal: 12,
          }}
        >
          {/* COPY */}
          <TouchableOpacity
            onPress={
              handleCopy
            }
            style={{
              alignItems:
                "center",
            }}
          >
            <Ionicons
              name="copy-outline"
              size={20}
              color="#fff"
            />

            <Text
              style={{
                color: "#fff",

                fontSize: 11,

                marginTop: 4,
              }}
            >
              Copiar
            </Text>
          </TouchableOpacity>

          {/* SHARE */}
          <TouchableOpacity
            onPress={
              handleShare
            }
            style={{
              alignItems:
                "center",
            }}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#fff"
            />

            <Text
              style={{
                color: "#fff",

                fontSize: 11,

                marginTop: 4,
              }}
            >
              Compartilhar
            </Text>
          </TouchableOpacity>

          {/* NOTES */}
          <TouchableOpacity
            onPress={
              handleOpenNotes
            }
            style={{
              alignItems:
                "center",
            }}
          >
            <Ionicons
              name="document-text-outline"
              size={20}
              color="#fff"
            />

            <Text
              style={{
                color: "#fff",

                fontSize: 11,

                marginTop: 4,
              }}
            >
              Anotações
            </Text>
          </TouchableOpacity>

          {/* CLOSE */}
          <TouchableOpacity
            onPress={
              clearSelection
            }
            style={{
              alignItems:
                "center",
            }}
          >
            <Ionicons
              name="close"
              size={22}
              color="#ff6666"
            />

            <Text
              style={{
                color:
                  "#ff6666",

                fontSize: 11,

                marginTop: 4,
              }}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NOTES MODAL */}
      <NotesModal
        visible={
          notesVisible
        }
        onClose={
          handleCloseNotes
        }
      />
    </>
  );
}