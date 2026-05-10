import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";

import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

export type ReadingData = {
  book: string;
  chapter: number;
  verse: number;
  verseText?: string;
  version?: string;
};

type ReadingState = {
  hydrated: boolean;

  // =====================================
  // LEITURA
  // =====================================

  currentReading:
    | ReadingData
    | null;

  lastReading:
    | ReadingData
    | null;

  // =====================================
  // SELEÇÃO
  // =====================================

  selectedVerse:
    | number
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
    verse: number | null
  ) => void;

  clearSelection: () => void;
};

export const useReadingStore =
  create<ReadingState>()(
    persist(
      (set) => ({
        hydrated: false,

        currentReading: null,

        lastReading: null,

        selectedVerse: null,

        // =====================================
        // CURRENT
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
        // LAST
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
        // SELECTED
        // =====================================

        setSelectedVerse: (
          verse
        ) =>
          set({
            selectedVerse: verse,
          }),

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