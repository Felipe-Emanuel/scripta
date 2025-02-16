
<p align="center">
  <h3 align="center">Memorize</h3>

<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li><a href="#Sobre-o-Projeto">Sobre o projeto</a></li>
    <li><a href="#Painel-de-Controle">Painel de Controle</a></li>
    <li><a href="#Próximas-Funcionalidades">Próximas Funcionalidades</a></li>
    <li><a href="#Desafios">Desafios</a></li>
    <li><a href="#Tecnologias">Tecnologias</a></li>
    <li><a href="#Padronização-de-código">Padronização de código</a></li>
    <li><a href="#Exemplo-de-código">Exemplo de código</a></li>
    <li><a href="#Testes">Testes</a></li>
    <li><a href="#Instalação-e-Inicialização">Instalação e Inicialização</a></li>
    <li><a href="#Estrutura-de-Pastas">Estrutura de Pastas</a></li>
  </ol>
</details>

# Sobre o Projeto

Este projeto está sendo desenvolvido para fornecer uma plataforma de acompanhamento e análise para escritores e leitores de livros. Com uma variedade de ferramentas e recursos, meu objetivo é ajudar escritores a monitorar seu progresso, entender melhor seus leitores e aprimorar suas obras.

## Painel de Controle

### Busca Avançada

- Encontre recursos específicos rapidamente através da busca avançada.

### Perfil do Escritor

- Acompanhe sua produtividade diária e mantenha-se motivado.

### Avaliação de Satisfação

- Defina metas diárias e visualize seu progresso com gráficos em tempo real.

### Análise de Desempenho

- Acompanhe o progresso das metas, visualize a quantidade de palavras escritas e obtenha insights valiosos através de gráficos intuitivos.

### Perfil do Leitor

- Explore a localização dos seus leitores, entenda melhor seu público-alvo e personalize suas obras de acordo com seus interesses.

### Análise por Gênero e Tema

- Visualize a distribuição dos seus livros por gênero e tema, identifique tendências e otimize suas estratégias de escrita.

![Dashboard Preview](https://github.com/Felipe-Emanuel/memorize/assets/108142146/98ff8e43-842e-4af6-9c27-43d023c87272)

## Próximas Funcionalidades

### Seus Livros

- Gestão de Livros: Uma funcionalidade abrangente para gerenciar e organizar sua biblioteca pessoal.

Para mais detalhes sobre o que está por vir, confira o [Roadmap](roadmap.md).

---

# Detalhes técnicos

## Desafios

* Manter uma interface dinâmica com performance
* Usabilidade atendendo ao público alvo

## Tecnologias

Principais tecnologias utilizadas
- **Frontend:**
  * Nextjs
  * Typescript
  * Jest
  * Testing Library
  * Tailwindcss
  * axios
  * Eslint e Prettier

- **Backend:**
  * NodeJs 
  * Fastify 
  * Jest 
  * Testing Library
  * Typescript

- **Banco de Dados:**
  * Primsa 
  * local - sqlite
  * quandor fizer deploy: PostgreSql

## Padronização de código

- **Geral**
    - Componentes estão sendo criados com extensão com .tsx
    - Estrutura da features estão corretas (views, services, utils, controllers, tests, estilo)
    - Componentes que podem ser reutilizados estão no @shared
    - Funções estão sendo externalizadas para arquivo de utils
    - Arquivos de estilo estão sendo criados com terminação TV
    - Está sendo mantido Composition Pattern
    - Sempre que possível, componentes estão sendo utilizados da lib <a href="https://nextui.org/">NextUi</a>
    - HTTP State é usado sempre que possível para evitar tráfego
    - Hooks, funções específicas e etc estão sendo documentados com js docs

## Exemplo de código

```
/**
 * @type T should contain the type of object to be returned and should be apllyied on the getDataFn as exemple
 * @param getDataFn async function to get data from database, local or anywhere. Should receive type of object returned and can receive a parameter
 * @param cacheName name of the cache to be created
 * @param cacheTime time of the cache
 * @param enabled optional param to define if this request should be enabled
 * @param initialData optional param to define a default value to this data
 * @returns data and all methods from useQuery
 * @example const getDataFn = (): TWordCount => ({}) as TWordCount
 * @example const { data } = useQueryData(getDataFn, 'wordCounters', '12-hours')
 */

export function useQueryData<T>(
  getDataFn: (params?: QueryFunction['arguments']) => Promise<T | undefined>,
  cacheName: TCacheName,
  cacheTime: TTimeToRefetchCache,
  enabled?: boolean,
  initialData?: T | InitialDataFunction<T>,
) {
  const staleTime = timeToRefetchCache[cacheTime]

  const { data, ...rest } = useQuery(cacheName, getDataFn, {
    refetchOnWindowFocus: false,
    staleTime,
    enabled,
    initialData,
  })

  return {
    data,
    ...rest,
  }
}

```

> Manter o uso do js docs facilita o uso do entendimento da funcionalidade
![image](https://github.com/Felipe-Emanuel/memorize/assets/108142146/42e73cb3-48f0-4997-9610-88040228b47c)


## Testes

- Testes unitários com Jest e testing library
- Backend está testando toda regra de negócio
- Frontend está testando integridade das features

## Instalação e Inicialização

1. Instale as dependências com Yarn
   ```sh
   yarn
   ```
2. Execute os testes
   ```sh
   yarn test:server; yarn test:web
   ```
3. Inicie o servidor
   ```sh
   cd packages; cd server; yarn dev
   ```
4. Inicie o client em dev
   ```sh
   cd packages; cd web; yarn dev
   ```
5. Inicie o client em prod
   ```sh
   cd packages; cd web; yarn build
   ```
6. Após o build
    ```
   yarn start
   ```
 
## Estrutura de Pastas
  
  **Web**
  
![image](https://github.com/Felipe-Emanuel/memorize/assets/108142146/55a8addd-958b-4d4b-b252-ebb5f767ab7a)

  **Server**
  
![image](https://github.com/Felipe-Emanuel/memorize/assets/108142146/e638702e-d661-4b71-a263-9e8a25345554)

