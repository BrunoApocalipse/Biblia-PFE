import { BOOKS } from "./books";

/**
 * Retorna array de capítulos baseado no livro
 */
export function getChapters(bookAbbrev: string): number[] {
  const book = BOOKS.find(
    (b) => b.abbrev.toLowerCase() === bookAbbrev.toLowerCase()
  );

  if (!book) return [];

  return Array.from({ length: book.chapters }, (_, i) => i + 1);
}