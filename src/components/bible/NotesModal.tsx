import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  BOOKS_MAP,
} from "@/constants/bible/books";

import {
  colors,
} from "@/constants/theme/colors";

import {
  useNotesStore,
} from "@/store/useNotesStore";

import {
  useReadingStore,
} from "@/store/useReadingStore";

// =====================================
// TYPES
// =====================================

type Props = {
  visible: boolean;

  onClose: () => void;
};

// =====================================
// COMPONENT
// =====================================

export default function NotesModal({
  visible,
  onClose,
}: Props) {
  const insets =
    useSafeAreaInsets();

  // =====================================
  // LOCAL STATE
  // =====================================

  const [content, setContent] =
    useState("");

  // =====================================
  // READING STORE
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

  // =====================================
  // NOTES STORE
  // =====================================

  const addNote =
    useNotesStore(
      (state) =>
        state.addNote
    );

  const updateNote =
    useNotesStore(
      (state) =>
        state.updateNote
    );

  const getNoteByVerse =
    useNotesStore(
      (state) =>
        state.getNoteByVerse
    );

  // =====================================
  // EXISTING NOTE
  // =====================================

  const existingNote =
    useMemo(() => {
      if (
        !selectedVerse
      ) {
        return undefined;
      }

      return getNoteByVerse(
        selectedVerse.book,
        selectedVerse.chapter,
        selectedVerse.verse
      );
    }, [
      selectedVerse,
      getNoteByVerse,
    ]);

  // =====================================
  // LOAD NOTE
  // =====================================

  useEffect(() => {
    if (!visible) {
      return;
    }

    setContent(
      existingNote?.content ??
        ""
    );
  }, [
    visible,
    existingNote,
  ]);

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

 // =====================================
// SAVE
// =====================================

function handleSave() {
  // GUARD
  if (
    !selectedVerse ||
    !currentReading
  ) {
    return;
  }

  // SAFE REFERENCES
  const verseData =
    selectedVerse;

  const readingData =
    currentReading;

  const trimmed =
    content.trim();

  // EMPTY
  if (
    trimmed.length === 0
  ) {
    onClose();
    return;
  }

  // =====================================
  // UPDATE
  // =====================================

  if (existingNote) {
    updateNote(
      existingNote.id,
      trimmed
    );

    onClose();

    return;
  }

  // =====================================
  // CREATE
  // =====================================

  addNote({
    id:
      Date.now().toString(),

    book:
      verseData.book,

    chapter:
      verseData.chapter,

    verse:
      verseData.verse,

    verseText:
      readingData.verseText ??
      "",

    content: trimmed,

    createdAt:
      Date.now(),

    updatedAt:
      Date.now(),
  });

  onClose();
}

  // =====================================
  // RENDER
  // =====================================

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View
        style={{
          flex: 1,

          backgroundColor:
            "rgba(0,0,0,0.5)",

          justifyContent:
            "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor:
              colors.surface,

            borderTopLeftRadius: 24,

            borderTopRightRadius: 24,

            paddingTop: 18,

            paddingHorizontal: 18,

            paddingBottom:
              insets.bottom + 18,

            minHeight: "65%",
          }}
        >
          {/* HEADER */}
          <Text
            style={{
              color: "#fff",

              fontSize: 18,

              fontWeight:
                "700",

              marginBottom: 14,
            }}
          >
            {existingNote
              ? "Editar anotação"
              : "Nova anotação"}
          </Text>

          {/* REFERENCE */}
          <Text
            style={{
              color: "#999",

              fontSize: 13,

              marginBottom: 8,
            }}
          >
            {reference}
          </Text>

          {/* VERSE */}
          <Text
            style={{
              color: "#fff",

              fontSize: 15,

              lineHeight: 26,

              marginBottom: 18,
            }}
          >
            {
              currentReading.verseText
            }
          </Text>

          {/* INPUT */}
          <TextInput
            value={content}
            onChangeText={
              setContent
            }
            multiline
            autoFocus
            placeholder="Escreva sua anotação..."
            placeholderTextColor="#666"
            textAlignVertical="top"
            style={{
              color: "#fff",

              fontSize: 16,

              lineHeight: 26,

              backgroundColor:
                "#111",

              borderRadius: 16,

              padding: 16,

              height: 220,

              maxHeight: 220,

              marginBottom: 18,
            }}
          />

          {/* ACTIONS */}
          <View
            style={{
              flexDirection:
                "row",

              gap: 12,
            }}
          >
            {/* CANCEL */}
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,

                height: 52,

                borderRadius: 14,

                backgroundColor:
                  "#222",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",

                  fontSize: 15,

                  fontWeight:
                    "600",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            {/* SAVE */}
            <TouchableOpacity
              onPress={
                handleSave
              }
              style={{
                flex: 1,

                height: 52,

                borderRadius: 14,

                backgroundColor:
                  "#fff",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >
              <Text
                style={{
                  color: "#000",

                  fontSize: 15,

                  fontWeight:
                    "700",
                }}
              >
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}