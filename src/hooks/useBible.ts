import {
  useMemo,
} from "react";

import {
  getBible,
} from "@/services/bible/BibleService";

export function useBible(
  book?: string,
  chapter?:
    | number
    | string,
  version: string = "nvi"
) {
  // =====================================
  // SAFE VALUES
  // =====================================

  const safeBook =
    book
      ?.toLowerCase()
      ?.trim() ?? "";

  const safeChapter =
    Number(chapter) || 0;

  const safeVersion =
    version
      ?.toLowerCase()
      ?.trim() ?? "nvi";

  // =====================================
  // BIBLE
  // =====================================

  const bible =
    useMemo(() => {
      return getBible(
        safeVersion
      );
    }, [safeVersion]);

  // =====================================
  // VERSES
  // =====================================

  const verses =
    useMemo(() => {
      if (
        !safeBook ||
        !safeChapter
      ) {
        return [];
      }

      return bible.filter(
        (verse) =>
          verse.bookAbbrev ===
            safeBook &&
          verse.chapter ===
            safeChapter
      );
    }, [
      bible,
      safeBook,
      safeChapter,
    ]);

  return {
    verses,

    total: verses.length,

    hasVerses:
      verses.length > 0,

    currentBook:
      safeBook,

    currentChapter:
      safeChapter,

    currentVersion:
      safeVersion,
  };
}