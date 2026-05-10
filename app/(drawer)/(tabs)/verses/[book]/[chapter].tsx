import VerseItem from "@/components/bible/VerseItem";
import Container from "@/components/ui/Container";

import { useBible } from "@/hooks/useBible";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  FlatList
} from "react-native";

export default function VersesScreen() {
  const router = useRouter();

  const { book, chapter } =
    useLocalSearchParams<{
      book: string;
      chapter: string;
    }>();

  const { verses } = useBible(
    String(book),
    Number(chapter)
  );

  return (
    <Container>
      <FlatList
        data={verses}
        numColumns={4}
        keyExtractor={(item) =>
          String(item.verse)
        }
        contentContainerStyle={{
           paddingVertical: 12,
        }}
      renderItem={({ item }) => (
        <VerseItem
          compact
          verse={item.verse}
          onPress={() =>
            router.push({
              pathname:
                "/reading/[book]/[chapter]",
              params: {
                book: String(book),
                chapter: String(chapter),
                verse: String(item.verse),
              },
            })
          }
        />
      )}
      />
    </Container>
  );
}