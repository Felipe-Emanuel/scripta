FROM node:alpine

WORKDIR /packages/server

# Copiar os arquivos de configuração do projeto
COPY packages/server/package.json packages/server/tsconfig.json ./ yarn.lock ./

# Instalar dependências
RUN yarn --frozen-lockfile
RUN yarn add typescript tsx -W

# Copiar os arquivos do projeto
COPY packages/server .

EXPOSE 3333

# Executar o comando de desenvolvimento
CMD ["yarn", "dev"]
