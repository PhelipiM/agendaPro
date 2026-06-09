# AgendaPro

AgendaPro agora tem frontend em Vite/React e backend em Spring Boot com H2.

## Pré-requisitos

- Node 18+
- Java 17+
- Maven 3.9+ recomendado

## Instalação do frontend

```bash
npm install
```

## Executar em desenvolvimento

Abra dois terminais:

```bash
npm run backend:dev
```

```bash
npm run dev
```

## Build do frontend

```bash
npm run build
```

## Build do backend

```bash
npm run backend:build
```

## Testes

```bash
npm run test
```

## Formatação

```bash
npm run format
```

## Backend

- Base da API: `http://localhost:8080/api`
- H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./backend-data/agendapro`

## Usuários de teste

- Admin: `admin@agendapro.com` / `admin123`
- Cliente: `cliente@agendapro.com` / `cliente123`

## Fluxos cobertos pelo backend

- Autenticação e sessão
- Cadastro e edição de perfil
- Gestão de serviços
- Criação de agendamentos
- Dashboard do cliente
- Dashboard administrativo
- Histórico do cliente

## Observações

- O frontend usa proxy para `/api`, então o backend deve estar rodando para login, cadastro e listas funcionarem.
- Se quiser reiniciar do zero, apague a pasta `backend-data` para recriar o banco H2 local.

