import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";

import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

// =====================================
// TYPES
// =====================================

export type ReadingData = {
  book: string;

  chapter: number;

  verse: number;

  verseText?: string;

  version?: string;
};

export type VerseSelection = {
  book: string;

  chapter: number;

  verse: number;
};

// =====================================
// STORE
// =====================================

type ReadingState = {
  hydrated: boolean;

  // =====================================
  // READING
  // =====================================

  currentReading:
    | ReadingData
    | null;

  lastReading:
    | ReadingData
    | null;

  // =====================================
  // SELECTION
  // =====================================

  selectedVerse:
    | VerseSelection
    | null;

  // =====================================
  // ACTIONS
  // =====================================

  setCurrentReading: (
    data: ReadingData
  ) => void;

  setLastReading: (
    data: ReadingData
  ) => void;

  setSelectedVerse: (
    verse:
      | VerseSelection
      | null
  ) => void;

  clearSelection: () => void;
};

// =====================================
// STORE
// =====================================

export const useReadingStore =
  create<ReadingState>()(
    persist(
      (set) => ({
        hydrated: false,

        currentReading: null,

        lastReading: null,

        selectedVerse: null,

        // =====================================
        // CURRENT READING
        // =====================================

        setCurrentReading: (
          data
        ) =>
          set({
            currentReading: {
              ...data,

              book:
                data.book.toLowerCase(),
            },
          }),

        // =====================================
        // LAST READING
        // =====================================

        setLastReading: (
          data
        ) =>
          set({
            lastReading: {
              ...data,

              book:
                data.book.toLowerCase(),
            },
          }),

        // =====================================
        // SELECT VERSE
        // =====================================

        setSelectedVerse: (
          verse
        ) =>
          set({
            selectedVerse: verse
              ? {
                  ...verse,

                  book:
                    verse.book.toLowerCase(),
                }
              : null,
          }),

        // =====================================
        // CLEAR
        // =====================================

        clearSelection: () =>
          set({
            selectedVerse: null,
          }),
      }),

      {
        name: "reading-storage",

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),

        // =====================================
        // HYDRATE
        // =====================================

        onRehydrateStorage:
          () => () => {
            useReadingStore.setState(
              {
                hydrated: true,
              }
            );
          },
      }
    )
  );