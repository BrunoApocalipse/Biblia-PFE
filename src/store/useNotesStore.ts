import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";

import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

export type Note = {
  id: string;

  book: string;

  chapter: number;

  verse: number;

  verseText: string;

  content: string;

  createdAt: number;

  updatedAt: number;
};

type NotesState = {
  hydrated: boolean;

  notes: Note[];

  editingNoteId: string | null;

  // =====================================
  // ACTIONS
  // =====================================

  addNote: (
    note: Note
  ) => void;

  updateNote: (
    id: string,
    content: string
  ) => void;

  removeNote: (
    id: string
  ) => void;

  getNoteByVerse: (
    book: string,
    chapter: number,
    verse: number
  ) => Note | undefined;

  setEditingNoteId: (
    id: string | null
  ) => void;

  getEditingNote: () => Note | undefined;
};

export const useNotesStore =
  create<NotesState>()(
    persist(
      (set, get) => ({
        hydrated: false,

        notes: [],

        editingNoteId: null,

        // =====================================
        // ADD
        // =====================================

        addNote: (
          note
        ) => {
          const existing =
            get().notes.find(
              (item) =>
                item.book ===
                  note.book &&
                item.chapter ===
                  note.chapter &&
                item.verse ===
                  note.verse
            );

          // =====================================
          // UPDATE EXISTING
          // =====================================

          if (existing) {
            set((state) => ({
              notes:
                state.notes.map(
                  (item) =>
                    item.id ===
                    existing.id
                      ? {
                          ...item,

                          content:
                            note.content,

                          updatedAt:
                            Date.now(),
                        }
                      : item
                ),
            }));

            return;
          }

          // =====================================
          // CREATE
          // =====================================

          set((state) => ({
            notes: [
              note,
              ...state.notes,
            ],
          }));
        },

        // =====================================
        // UPDATE
        // =====================================

        updateNote: (
          id,
          content
        ) =>
          set((state) => ({
            notes:
              state.notes.map(
                (note) =>
                  note.id === id
                    ? {
                        ...note,

                        content,

                        updatedAt:
                          Date.now(),
                      }
                    : note
              ),
          })),

        // =====================================
        // REMOVE
        // =====================================

        removeNote: (
          id
        ) =>
          set((state) => ({
            notes:
              state.notes.filter(
                (note) =>
                  note.id !== id
              ),
          })),

        // =====================================
        // GET BY VERSE
        // =====================================

        getNoteByVerse: (
          book,
          chapter,
          verse
        ) => {
          return get().notes.find(
            (note) =>
              note.book ===
                book &&
              note.chapter ===
                chapter &&
              note.verse ===
                verse
          );
        },

        // =====================================
        // EDITING
        // =====================================

        setEditingNoteId: (
          id
        ) =>
          set({
            editingNoteId: id,
          }),

        getEditingNote: () => {
          const {
            notes,
            editingNoteId,
          } = get();

          return notes.find(
            (note) =>
              note.id ===
              editingNoteId
          );
        },
      }),

      {
        name: "notes-storage",

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),

        onRehydrateStorage:
          () => () => {
            useNotesStore.setState(
              {
                hydrated: true,
              }
            );
          },
      }
    )
  );