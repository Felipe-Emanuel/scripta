# 🐳 Docker Setup para Scripta

Este diretório contém os arquivos necessários para a configuração do ambiente Docker.

## 📦 Buildando a imagem do servidor
```sh
docker build -t scripta-server -f docker/Dockerfile.server .
```

## Buildando as imagens e subindo o container
```sh
docker compose -d --build
```

## 📦 Subindo o container
```sh
docker compose up -d

