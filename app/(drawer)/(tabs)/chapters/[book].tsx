import ChapterItem from "@/components/bible/ChapterItem";
import Container from "@/components/ui/Container";
import { getChapters } from "@/constants/bible/chapters";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";

export default function Chapters() {
  const { book } = useLocalSearchParams<{ book: string }>();

  const chapters = getChapters(String(book));

  return (
    <Container>
      <FlatList
        data={chapters}
        numColumns={4}
        keyExtractor={(item) => String(item)}
        contentContainerStyle={{
          paddingVertical: 12,
        }}
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            onPress={() =>
              router.push({
                pathname: "/verses/[book]/[chapter]",
                params: {
                  book: String(book),
                  chapter: String(item),
                },
              })
            }
          />
        )}
      />
    </Container>
  );
}