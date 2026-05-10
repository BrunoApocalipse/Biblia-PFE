import {
  useEffect,
  useRef,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

import { FlashList } from "@shopify/flash-list";

import VerseItem from "@/components/bible/VerseItem";

import Container from "@/components/ui/Container";

import { useBible } from "@/hooks/useBible";

import {
  useReadingStore,
} from "@/store/useReadingStore";

export default function Reading() {
  const listRef =
    useRef<any>(null);

  const hasScrolled =
    useRef(false);

  const {
    book,
    chapter,
    verse,
  } = useLocalSearchParams();

  const {
    selectedVerse,
    setSelectedVerse,
    setCurrentReading,
    setLastReading,
  } = useReadingStore();

  const { verses } = useBible(
    String(book),
    Number(chapter)
  );

  // =====================================
  // INITIAL VERSE
  // =====================================

  const initialVerse =
    Number(verse);

  // =====================================
  // INIT SELECTED VERSE
  // =====================================

  useEffect(() => {
    if (initialVerse) {
      setSelectedVerse(initialVerse);
    }
  }, [initialVerse]);

  // =====================================
  // STORE
  // =====================================

  useEffect(() => {
    const payload = {
      book: String(book),
      chapter: Number(chapter),
      verse:
        selectedVerse || 1,
    };

    setCurrentReading(payload);

    setLastReading(payload);
  }, [
    book,
    chapter,
    selectedVerse,
  ]);

  // =====================================
  // RESET SCROLL
  // =====================================

  useEffect(() => {
    hasScrolled.current = false;
  }, [
    book,
    chapter,
    selectedVerse,
  ]);

  // =====================================
  // AUTO SCROLL
  // =====================================

  useEffect(() => {
    if (
      hasScrolled.current ||
      !selectedVerse ||
      verses.length === 0
    ) {
      return;
    }

    const timeout =
      setTimeout(() => {
        try {
          listRef.current?.scrollToIndex({
            index:
              selectedVerse - 1,

            animated: false,

            viewPosition: 0.35,
          });

          hasScrolled.current =
            true;
        } catch (error) {}
      }, 350);

    return () =>
      clearTimeout(timeout);
  }, [
    selectedVerse,
    verses.length,
  ]);

  return (
    <Container>
      <FlashList<any>
        ref={listRef}
        data={verses}
        {...({
          estimatedItemSize: 90,
        } as any)}
        keyExtractor={(item) =>
          `${item.verse}`
        }
        contentContainerStyle={{
          paddingVertical: 12,
          paddingHorizontal: 12,
        }}
        renderItem={({ item }) => (
          <VerseItem
            verse={item.verse}
            text={item.text}
            selected={
              item.verse ===
              selectedVerse
            }
            onPress={() => {
              setSelectedVerse(
                item.verse
              );
            }}
            onLongPress={() => {
              setSelectedVerse(
                item.verse
              );
            }}
          />
        )}
      />
    </Container>
  );
}