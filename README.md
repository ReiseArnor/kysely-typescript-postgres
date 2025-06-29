# Kysely + TypeScript + Postgres

This project is a minimal API using [Kysely](https://kysely.dev/) as a type-safe SQL query builder with TypeScript and PostgreSQL.

## 🚀 Features

- 🟣 Kysely — type-safe SQL queries and migrations
- 🟦 TypeScript — static typing for safer code
- 🐘 PostgreSQL — database backend (via Docker or local instance)
- 🛠 kysely-codegen — generate database types from your schema

## 🐳 Running Postgres with Docker

```
docker run --name kysely-postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres
```

## ⚙️ Environment variables

Create a `.env` file in the root of the project:

```
DATABASE_URL=postgresql://postgres:pass@localhost:5432/postgres
```

## ⚡ Usage

### Install dependencies

```
pnpm install
```

| Script | Description |
|---------|-------------|
| `pnpm start` | Run the main app (`src/index.ts`) |
| `pnpm migrate` | Run migrations via Kysely |
| `pnpm reset:db` | Run custom force-reset (down + up all migrations) |
| `pnpm generate-types` | Generate TypeScript types from DB schema |

## 💡 Notes

- The connection URL is loaded from `.env` (DATABASE_URL).
- This setup is intended for development. In production, apply migrations incrementally and avoid destructive resets.

## 📌 Requirements

- Node.js 20+
- pnpm 10+
- Docker (for local Postgres)
