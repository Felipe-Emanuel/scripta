export const columns = [
  { name: 'LÍVRO', uid: 'book' },
  { name: 'GÊNERO', uid: 'gender' },
  { name: 'TEMA', uid: 'theme' },
  { name: 'PERSONAGENS', uid: 'character', sortable: true },
  { name: 'REAÇÕES', uid: 'reaction', sortable: true },
  { name: 'ACESSOS', uid: 'hits', sortable: true },
  { name: 'PALAVRAS', uid: 'totalWords', sortable: true },
  { name: 'ESTADO', uid: 'isActive', sortable: true },
  { name: 'ESTÁGIO', uid: 'conclued', sortable: true },
  { name: 'DESCRIÇÃO', uid: 'description' },
  { name: 'AÇÕES', uid: 'actions' }
]

export const statusOptions = [
  { name: 'Público', uid: 'public' },
  { name: 'Oculto', uid: 'ocult' }
]
