# Fluxo das Branches

## 📌 Estrutura de Branches

- **`main`** → Branch estável, usada para produção.
- **`develop`** → Branch de integração, onde novas funcionalidades e correções são testadas antes do deploy.
- **`feature/nome-da-feature`** → Branches para novas funcionalidades.
- **`fix/nome-do-bug`** → Branches para correção de bugs.
- **`hotfix/nome-do-hotfix`** → Branches para correções urgentes na produção.

## 🔄 Fluxo de Trabalho

### 1️⃣ Criar uma nova feature
```sh
# Criar a branch a partir de DEVELOP
git checkout -b feature/nova-feature develop
```
- Desenvolva e faça commits organizados.
- Quando finalizar, abra um **Pull Request** para `develop`.
- Após revisão e aprovação, faça o merge:
  ```sh
  git checkout develop
  git merge feature/nova-feature
  git push origin develop
  ```

### 2️⃣ Corrigir bugs antes do release
```sh
# Criar a branch a partir de DEVELOP
git checkout -b fix/corrigir-bug develop
```
- Após correção, abra um **Pull Request** para `develop`.
- Merge para `develop` após revisão.

### 3️⃣ Preparar para produção
```sh
git checkout main
git merge develop
git push origin main
```

### 4️⃣ Corrigir algo urgente na produção
```sh
# Criar a branch a partir de MAIN
git checkout -b hotfix/erro-crítico main
```
- Após correção, merge para `main` e `develop`.
```sh
git checkout main
git merge hotfix/erro-crítico
git push origin main
git checkout develop
git merge hotfix/erro-crítico
git push origin develop
```
