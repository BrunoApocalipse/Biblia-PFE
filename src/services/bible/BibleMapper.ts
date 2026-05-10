export type FlatVerse = {
  bookAbbrev: string;
  bookName?: string;
  chapter: number;
  verse: number;
  text: string;
};

export function normalizeBible(
  data: any
): FlatVerse[] {
  if (!data) return [];

  // =========================================
  // 🔥 FORMATO FLAT
  // =========================================

  if (Array.isArray(data.verses)) {
    return data.verses.map((v: any) => ({
      bookAbbrev:
        v.bookAbbrev?.toLowerCase(),

      bookName: v.bookName,

      chapter: Number(v.chapter),

      verse: Number(v.verse),

      text: String(v.text ?? ""),
    }));
  }

  // =========================================
  // 🔥 FORMATO ARRAY
  // chapters: [[]]
  // =========================================

  if (
    Array.isArray(data) &&
    Array.isArray(data[0]?.chapters?.[0])
  ) {
    const result: FlatVerse[] = [];

    data.forEach((book: any) => {
      book.chapters.forEach(
        (
          chapter: string[],
          cIndex: number
        ) => {
          chapter.forEach(
            (
              text: string,
              vIndex: number
            ) => {
              result.push({
                bookAbbrev:
                  book.abbrev?.toLowerCase(),

                bookName: book.name,

                chapter: cIndex + 1,

                verse: vIndex + 1,

                text:
                  String(text ?? ""),
              });
            }
          );
        }
      );
    });

    return result;
  }

  // =========================================
  // 🔥 FORMATO OBJECT
  // chapters: [{ "1": { "1": "text" }}]
  // =========================================

  if (
    Array.isArray(data) &&
    typeof data[0]?.chapters?.[0] ===
      "object"
  ) {
    const result: FlatVerse[] = [];

    data.forEach((book: any) => {
      book.chapters.forEach(
        (chapterObj: any) => {
          const chapterKey =
            Object.keys(chapterObj)[0];

          const versesObject =
            chapterObj[chapterKey];

          Object.entries(
            versesObject
          ).forEach(
            ([verseKey, text]) => {
              result.push({
                bookAbbrev:
                  book.abbrev?.toLowerCase(),

                bookName:
                  book.book ??
                  book.name,

                chapter:
                  Number(chapterKey),

                verse:
                  Number(verseKey),

                text:
                  String(text ?? ""),
              });
            }
          );
        }
      );
    });

    return result;
  }

  return [];
}