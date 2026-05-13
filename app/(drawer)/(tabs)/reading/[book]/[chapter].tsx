import {
  useCallback,
  useEffect,
  useMemo,
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

  // =====================================
  // ROUTE PARAMS
  // =====================================

  const {
    book,
    chapter,
    verse,
  } = useLocalSearchParams();

  const bookParam =
    String(book).toLowerCase();

  const chapterParam =
    Number(chapter);

  const initialVerse =
    Number(verse || 1);

  // =====================================
  // STORE
  // =====================================

  const selectedVerse =
    useReadingStore(
      (state) =>
        state.selectedVerse
    );

  const setSelectedVerse =
    useReadingStore(
      (state) =>
        state.setSelectedVerse
    );

  const setCurrentReading =
    useReadingStore(
      (state) =>
        state.setCurrentReading
    );

  const setLastReading =
    useReadingStore(
      (state) =>
        state.setLastReading
    );

  // =====================================
  // BIBLE
  // =====================================

  const { verses } = useBible(
    bookParam,
    chapterParam
  );

  // =====================================
  // ACTIVE VERSE
  // =====================================

  const activeVerse =
    selectedVerse?.book ===
      bookParam &&
    selectedVerse?.chapter ===
      chapterParam
      ? selectedVerse.verse
      : initialVerse;

  // =====================================
  // ACTIVE VERSE DATA
  // =====================================

  const activeVerseData =
    useMemo(() => {
      return verses.find(
        (item) =>
          item.verse ===
          activeVerse
      );
    }, [
      verses,
      activeVerse,
    ]);

  // =====================================
  // STORE UPDATE
  // =====================================

  useEffect(() => {
    if (
      verses.length === 0
    ) {
      return;
    }

    const payload = {
      book: bookParam,

      chapter:
        chapterParam,

      verse: activeVerse,

      verseText:
        activeVerseData?.text ??
        "",

      version: "NVI",
    };

    setCurrentReading(
      payload
    );

    setLastReading(
      payload
    );
  }, [
    verses,
    bookParam,
    chapterParam,
    activeVerse,
    activeVerseData,
    setCurrentReading,
    setLastReading,
  ]);

  // =====================================
  // RESET SCROLL
  // =====================================

  useEffect(() => {
    hasScrolled.current = false;
  }, [
    bookParam,
    chapterParam,
    initialVerse,
  ]);

  // =====================================
  // AUTO SCROLL
  // =====================================

  useEffect(() => {
    if (
      hasScrolled.current ||
      verses.length === 0
    ) {
      return;
    }

    const timeout =
      setTimeout(() => {
        try {
          listRef.current?.scrollToIndex({
            index:
              initialVerse - 1,

            animated: false,

            viewPosition: 0.35,
          });

          hasScrolled.current =
            true;
        } catch {}
      }, 350);

    return () =>
      clearTimeout(timeout);
  }, [
    initialVerse,
    verses.length,
  ]);

  // =====================================
  // TOGGLE VERSE
  // =====================================

  const toggleVerse =
    useCallback(
      (verseNumber: number) => {
        const isSelected =
          selectedVerse?.book ===
            bookParam &&
          selectedVerse?.chapter ===
            chapterParam &&
          selectedVerse?.verse ===
            verseNumber;

        // REMOVE
        if (isSelected) {
          setSelectedVerse(
            null
          );

          return;
        }

        // SELECT
        setSelectedVerse({
          book: bookParam,

          chapter:
            chapterParam,

          verse:
            verseNumber,
        });
      },
      [
        selectedVerse,
        bookParam,
        chapterParam,
        setSelectedVerse,
      ]
    );

  // =====================================
  // RENDER ITEM
  // =====================================

  const renderVerseItem =
    useCallback(
      ({ item }: any) => {
        const isSelected =
          selectedVerse?.book ===
            bookParam &&
          selectedVerse?.chapter ===
            chapterParam &&
          selectedVerse?.verse ===
            item.verse;

        return (
          <VerseItem
            verse={item.verse}
            text={item.text}
            selected={
              isSelected
            }
            onPress={() =>
              toggleVerse(
                item.verse
              )
            }
            onLongPress={() =>
              toggleVerse(
                item.verse
              )
            }
          />
        );
      },
      [
        selectedVerse,
        bookParam,
        chapterParam,
        toggleVerse,
      ]
    );

  // =====================================
  // RENDER
  // =====================================

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
        renderItem={
          renderVerseItem
        }
      />
    </Container>
  );
}