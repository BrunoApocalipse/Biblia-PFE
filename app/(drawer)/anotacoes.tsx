import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import AppHeader from "@/components/navigation/AppHeader";

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

export default function AnotacoesScreen() {
  const router =
    useRouter();

  // =====================================
  // STORE
  // =====================================

  const notes =
    useNotesStore(
      (state) =>
        state.notes
    );

  const removeNote =
    useNotesStore(
      (state) =>
        state.removeNote
    );

  const setSelectedVerse =
    useReadingStore(
      (state) =>
        state.setSelectedVerse
    );

  // =====================================
  // EMPTY
  // =====================================

  if (notes.length === 0) {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor:
            colors.background,
        }}
      >
        <AppHeader />

        <View
          style={{
            flex: 1,

            alignItems:
              "center",

            justifyContent:
              "center",

            padding: 24,
          }}
        >
          <Text
            style={{
              color: "#666",

              fontSize: 16,

              textAlign:
                "center",
            }}
          >
            Nenhuma anotação criada ainda.
          </Text>
        </View>
      </View>
    );
  }

  // =====================================
  // OPEN READING
  // =====================================

  function handleOpenReading(
    item: any
  ) {
    router.push({
      pathname:
        "/reading/[book]/[chapter]",

      params: {
        book:
          item.book,

        chapter:
          String(
            item.chapter
          ),

        verse:
          String(
            item.verse
          ),
      },
    });
  }

  // =====================================
  // OPEN NOTE
  // =====================================

  function handleEdit(
    item: any
  ) {
    // SELECT VERSE
    setSelectedVerse({
      book:
        item.book,

      chapter:
        item.chapter,

      verse:
        item.verse,
    });

    // SET EDITING NOTE
    useNotesStore
      .getState()
      .setEditingNoteId(
        item.id
      );

    // OPEN NOTES MODAL
    router.push(
      "/(modals)/notes"
    );
  }

  // =====================================
  // REMOVE
  // =====================================

  function handleRemove(
    id: string
  ) {
    removeNote(id);
  }

  // =====================================
  // RENDER
  // =====================================

  return (
    <View
      style={{
        flex: 1,

        backgroundColor:
          colors.background,
      }}
    >
      <AppHeader />

      <FlatList
        data={notes}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          padding: 14,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => {
          const bookLabel =
            BOOKS_MAP[
              item.book
            ]?.name ??
            item.book;

          const date =
            new Date(
              item.updatedAt
            ).toLocaleString(
              "pt-BR",
              {
                dateStyle:
                  "short",

                timeStyle:
                  "short",
              }
            );

          return (
            <TouchableOpacity
              activeOpacity={
                0.9
              }
              onPress={() =>
                handleOpenReading(
                  item
                )
              }
              style={{
                backgroundColor:
                  "#111",

                borderRadius: 18,

                padding: 16,

                marginBottom: 14,
              }}
            >
              {/* REFERÊNCIA */}
              <Text
                style={{
                  color:
                    "#999",

                  fontSize: 12,

                  marginBottom: 8,
                }}
              >
                {bookLabel}{" "}
                {
                  item.chapter
                }
                :
                {
                  item.verse
                }
              </Text>

              {/* VERSÍCULO */}
              <Text
                numberOfLines={3}
                style={{
                  color:
                    "#777",

                  fontSize: 14,

                  lineHeight: 24,

                  marginBottom: 12,
                }}
              >
                {
                  item.verseText
                }
              </Text>

              {/* ANOTAÇÃO */}
              <Text
                style={{
                  color:
                    "#fff",

                  fontSize: 16,

                  lineHeight: 26,
                }}
              >
                {
                  item.content
                }
              </Text>

              {/* FOOTER */}
              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  marginTop: 14,
                }}
              >
                {/* DATA */}
                <Text
                  style={{
                    color:
                      "#666",

                    fontSize: 11,
                  }}
                >
                  {date}
                </Text>

                {/* ACTIONS */}
                <View
                  style={{
                    flexDirection:
                      "row",

                    gap: 10,
                  }}
                >
                  {/* EDITAR */}
                  <TouchableOpacity
                    onPress={() =>
                      handleEdit(
                        item
                      )
                    }
                    style={{
                      paddingHorizontal: 10,

                      paddingVertical: 5,

                      borderRadius: 8,

                      backgroundColor:
                        "#1E1E1E",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#fff",

                        fontSize: 11,

                        fontWeight:
                          "600",
                      }}
                    >
                      Editar
                    </Text>
                  </TouchableOpacity>

                  {/* EXCLUIR */}
                  <TouchableOpacity
                    onPress={() =>
                      handleRemove(
                        item.id
                      )
                    }
                    style={{
                      paddingHorizontal: 10,

                      paddingVertical: 5,

                      borderRadius: 8,

                      backgroundColor:
                        "#2A1111",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#ff6666",

                        fontSize: 11,

                        fontWeight:
                          "600",
                      }}
                    >
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}