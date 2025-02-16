import {
  MAX_WORDS_BY_CHAPTER,
  MIN_WORDS_BY_CHAPTER,
  MIN_CHAPTER_TITLE_CHARACTERS,
  MAX_CHAPTER_TITLE_CHARACTERS
} from './contants'

export const throwChapterMessages = {
  unexpectedChapterId: 'Um capítulo não pode ser publicado sem estar relacionado à um livro',
  wordsCounterAreExpected: 'Um livro não pode ser criado sem um contador de palavras',
  wrongWordsCounter: 'Formáto inválido para o contador de palavras',
  maxLength: `Quantidade máxima de caracteres por capítulo é de ${MAX_WORDS_BY_CHAPTER}`,
  minLength: `Quantidade mínima de caracteres por capítulo é de ${MIN_WORDS_BY_CHAPTER}`,
  maxLengthTitle: `Quantidade mínima para título é de ${MIN_CHAPTER_TITLE_CHARACTERS}`,
  minLengthTitle: `Quantidade máxima para título é de ${MAX_CHAPTER_TITLE_CHARACTERS}`,
  wrongId: 'O lívro indicado não existe ou não pertence à este capítulo.',
  somethingWrong: 'Alguma propriedade não está no formato válido!',
  requiredEmail: 'capítulo sem autor registrado!',
  invalidEmail: 'e-mail inválido para atualziar o capítulo!',
  idRequired: 'id do capítulo inexistente e necessário',
  notFound: 'Capítulo não encontrado.',
  titleRequired: 'Novo título inexistente.'
}
