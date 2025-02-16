export const APP_ROUTES = {
  private: {
    dashboard: {
      name: '/dashboard',
      label: 'Seu Painel',
      base: 'Você'
    },
    characters: {
      name: '/characters',
      label: 'Seus Personagens',
      base: 'Você'
    },
    books: {
      name: '/books',
      label: 'Seus Livros',
      base: 'Você'
    },
    profile: {
      name: '/profile',
      label: 'Seu Perfil',
      base: 'Você'
    },
    chapters: {
      name: '/chapters',
      label: 'Capítulos',
      base: 'Você'
    }
  },
  public: {
    auth: {
      name: '/auth',
      label: '',
      base: ''
    },
    news: {
      name: '/',
      label: 'Novidades',
      base: 'Navegador'
    }
  }
}
