# Use uma imagem base que tenha Node.js e uma versão do yarn que suporte workspaces
FROM node:alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de configuração do monorepo
COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY packages packages

# Instale as dependências
RUN yarn install --frozen-lockfile
RUN yarn workspace @memorize/server tsup
# Exponha a porta que o backend vai usar (exemplo: 3333 para o backend)
EXPOSE 3333

# Defina o comando para iniciar o backend
# Ajuste este comando conforme necessário para iniciar o frontend ou ambos
CMD ["yarn", "start-dev:server"]
