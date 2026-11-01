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

La documentación interactiva (OpenAPI + Swagger UI) está en `http://localhost:3000/api-docs`.

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

## Registro de uso de IA

Usé Claude (Claude Code) como guía durante todo el proyecto. Al principio yo escribía el código y la IA me explicaba línea por línea y revisaba. Al final, por la fecha de entrega, la IA escribió partes y yo las revisé y probé.

**1. Plan y estructura.** Le pedí leer la consigna y las lecturas del módulo y armar un plan. Propuso la estructura `routes/`, `services/`, `db/` y separar `app.js` de `server.js` para los tests. Lo acepté. Me avisó que Express 5 rompe `app.all('*')` de las lecturas, así que bajé a Express 4.

**2. Base de datos.** Escribí `setup.sql` y `seed.sql` con su guía. La IA encontró errores de tipeo míos (`TIMESTAMPZ`, `INTERGER`, `tittle`, faltaba `ON DELETE CASCADE`) y los corregí a mano. Cuando olvidé la clave de Postgres me guió para cambiar `pg_hba.conf` a `trust`, resetearla y volverlo a `scram-sha-256`. Esos cambios de seguridad los hice yo.

**3. CRUD de authors.** Lo escribí a mano para practicar. La IA revisó y señaló errores: `====`, `number(` en vez de `Number(`, un DELETE que devolvía 400 en vez de 404, una variable declarada dos veces. Los corregí yo.

**4. CRUD de posts y JOIN.** Lo escribió la IA y me lo explicó: el JOIN de `/posts/author/:authorId`, `COALESCE` para updates parciales, y el error `23503` de Postgres convertido en 404 "author not found". Lo probé con 15 casos.

**5. Errores, tests y docs.** La IA agregó el 404 para rutas desconocidas y el middleware de errores (JSON mal formado da 400). Los tests con Vitest y Supertest los hicimos juntos: yo escribí los de authors, ella los de posts. También escribió el `openapi.yaml` y este README; yo los revisé.

**Qué no acepté o cambié:** cuando me explicó con comentarios dentro del código le pedí volver al formato de código y explicación por separado. Decidí no hacer los posts en memoria y pasar directo a PostgreSQL, porque ya teníamos los authors en memoria y no tenía sentido repetirlo.

**Seguridad:** la contraseña de Postgres nunca se la pasé a la IA. Yo la escribí en `.env`, que no se sube al repo.
