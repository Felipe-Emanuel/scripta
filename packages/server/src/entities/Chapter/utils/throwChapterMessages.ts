import {
  MAX_WORDS_BY_CHAPTER,
  MIN_WORDS_BY_CHAPTER,
  MIN_CHAPTER_TITLE_CHARACTERS
} from './contants'

export const throwChapterMessages = {
  unexpectedChapterId: 'Um capítulo não pode ser publicado sem estar relacionado à um livro',
  wordsCounterAreExpected: 'Um livro não pode ser criado sem um contador de palavras',
  wrongWordsCounter: 'Formáto inválido para o contador de palavras',
  maxLength: `Quantidade máxima de caracteres por capítulo é de ${MAX_WORDS_BY_CHAPTER}`,
  minLength: `Quantidade mínima de caracteres por capítulo é de ${MIN_WORDS_BY_CHAPTER}`,
  maxLengthTitle: `Quantidade mínima para título é de ${MIN_CHAPTER_TITLE_CHARACTERS}`,
  minLengthTitle: `Quantidade máxima para título é de ${MIN_CHAPTER_TITLE_CHARACTERS}`,
  somethingWrong: 'Alguma propriedade não está no formato válido!'
}
