# API MiniBlog

API REST para un blog con autores y posts. Hecha con Node.js, Express y PostgreSQL (con `pg`, sin ORM).

## Requisitos

- Node.js 20.12 o superior (usa `process.loadEnvFile`)
- PostgreSQL

## Instalación

```bash
npm install
```

Crea la base de datos y carga las tablas y los datos de ejemplo:

```bash
psql -U postgres -c "CREATE DATABASE miniblog;"
psql -U postgres -d miniblog -f db/setup.sql
psql -U postgres -d miniblog -f db/seed.sql
```

Copia `.env.example` a `.env` y pon tu contraseña de Postgres:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/miniblog
PORT=3000
```

## Uso

```bash
npm run dev    # modo desarrollo, se reinicia al guardar
npm start      # modo normal
```

La API queda en `http://localhost:3000`.

## Endpoints

### Authors

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/authors` | Lista todos los autores |
| GET | `/authors/:id` | Un autor por id |
| POST | `/authors` | Crea un autor (`name` y `email` obligatorios) |
| PUT | `/authors/:id` | Actualiza un autor |
| DELETE | `/authors/:id` | Borra un autor y sus posts |

### Posts

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/posts` | Lista todos los posts |
| GET | `/posts/:id` | Un post por id |
| GET | `/posts/author/:authorId` | Posts de un autor, con los datos del autor |
| POST | `/posts` | Crea un post (`title`, `content` y `author_id` obligatorios) |
| PUT | `/posts/:id` | Actualiza un post |
| DELETE | `/posts/:id` | Borra un post |

### Códigos de respuesta

- `200` OK
- `201` creado
- `204` borrado
- `400` datos inválidos
- `404` no existe
- `409` email repetido
- `500` error del servidor

## Tests

Usan Vitest y Supertest contra la base de datos local:

```bash
npm test
```
