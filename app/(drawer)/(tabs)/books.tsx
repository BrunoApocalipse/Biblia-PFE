import BookItem from "@/components/bible/BookItem";
import Container from "@/components/ui/Container";
import { BOOKS } from "@/constants/bible/books";
import { router } from "expo-router";
import { FlatList } from "react-native";

export default function Books() {
  return (
    <Container>
      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.abbrev}
        contentContainerStyle={{
          paddingVertical: 12,
        }}
        renderItem={({ item }) => (
          <BookItem
            name={item.name}
            abbrev={item.abbrev}
            onPress={() =>
              router.push(`/chapters/${item.abbrev}`)
            }
          />
        )}
      />
    </Container>
  );
}