import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  router,
} from "expo-router";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  BOOKS_MAP,
} from "@/constants/bible/books";

import {
  useNotesStore,
} from "@/store/useNotesStore";

import {
  useReadingStore,
} from "@/store/useReadingStore";

export default function NotesScreen() {
  const [text, setText] =
    useState("");

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
      if (!selectedVerse) {
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
  // LOAD
  // =====================================

  useEffect(() => {
    setText(
      existingNote?.content ??
        ""
    );
  }, [existingNote]);

  // =====================================
  // SAVE
  // =====================================

  function handleSave() {
    if (
      !selectedVerse ||
      !currentReading
    ) {
      return;
    }

    const verseData =
      selectedVerse;

    const readingData =
      currentReading;

    const trimmed =
      text.trim();

    if (
      trimmed.length === 0
    ) {
      router.back();
      return;
    }

    // UPDATE
    if (existingNote) {
      updateNote(
        existingNote.id,
        trimmed
      );

      clearSelection();

      router.back();

      return;
    }

    // CREATE
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

    clearSelection();

    router.back();
  }

  // =====================================
  // CANCEL
  // =====================================

  function handleCancel() {
    router.back();
  }

  // =====================================
  // GUARD
  // =====================================

  if (
    !selectedVerse ||
    !currentReading
  ) {
    return null;
  }

  const bookLabel =
    BOOKS_MAP[
      selectedVerse.book
    ]?.name ??
    selectedVerse.book;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          "#000",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 18,
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight:
              "700",
            marginBottom: 14,
          }}
        >
          Anotação
        </Text>

        {/* REF */}
        <Text
          style={{
            color: "#999",
            marginBottom: 8,
          }}
        >
          {bookLabel}{" "}
          {
            selectedVerse.chapter
          }
          :
          {
            selectedVerse.verse
          }
        </Text>

        {/* VERSE */}
        <Text
          style={{
            color: "#fff",
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
          value={text}
          onChangeText={
            setText
          }
          multiline
          autoFocus
          placeholder="Escreva sua anotação..."
          placeholderTextColor="#666"
          textAlignVertical="top"
          style={{
            flex: 1,
            color: "#fff",
            backgroundColor:
              "#111",
            borderRadius: 16,
            padding: 16,
            fontSize: 16,
          }}
        />

        {/* ACTIONS */}
        <View
          style={{
            flexDirection:
              "row",
            gap: 12,
            marginTop: 18,
          }}
        >
          <TouchableOpacity
            onPress={
              handleCancel
            }
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
                fontWeight:
                  "600",
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>

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
                fontWeight:
                  "700",
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}