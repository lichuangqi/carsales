# Carsales API

Carsales API is a NestJS backend for user authentication, vehicle sales reports, report approval, and market-price estimation. It exposes a validated REST API backed by TypeORM, using SQLite for local development and PostgreSQL in production.

## Features

- Email and password signup/signin with salted password hashing
- Cookie-based sessions and authenticated user resolution
- Authentication and administrator authorization guards
- User CRUD operations with serialized responses
- Vehicle sales report creation and administrator approval
- Price estimates calculated from approved reports with vehicle and location filters
- DTO validation, response serialization, middleware, interceptors, and dependency injection
- TypeORM migrations shared across SQLite and PostgreSQL
- Unit and end-to-end tests with Vitest and Supertest

## Architecture

The application is organized into NestJS feature modules:

- `UsersModule` manages users, authentication, sessions, and user persistence.
- `ReportsModule` manages vehicle reports, approval, and price-estimate queries.
- Controllers define the HTTP boundary and validation contracts.
- Services contain application and domain logic.
- TypeORM repositories and entities provide database persistence.
- Guards and middleware enforce authentication and permissions.
- Interceptors and DTOs control the shape of API responses.

## Technology

- Node.js 24
- TypeScript and NestJS
- TypeORM
- SQLite for local development and isolated tests
- PostgreSQL on Neon for production
- Vitest and Supertest
- Render Blueprint deployment

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env.development`:

```dotenv
DB_NAME=db.sqlite
COOKIE_KEY=replace-with-a-long-random-value
```

Apply database migrations and start the development server:

```bash
npm run migration:run
npm run start:dev
```

The API listens on `http://localhost:3000` by default.

## API overview

### Authentication and users

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/auth/signup` | Create an account and start a session |
| `POST` | `/auth/signin` | Authenticate and start a session |
| `POST` | `/auth/signout` | Clear the current session |
| `GET` | `/auth/whoami` | Return the authenticated user |
| `GET` | `/auth?email=...` | Find users by email |
| `GET` | `/auth/:id` | Find a user by ID |
| `PATCH` | `/auth/:id` | Update a user |
| `DELETE` | `/auth/:id` | Delete a user |

### Reports

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/reports` | Create a vehicle sales report |
| `PATCH` | `/reports/:id` | Approve or reject a report as an administrator |
| `GET` | `/reports` | Estimate a vehicle price from approved reports |

The estimate endpoint accepts `make`, `model`, `year`, `mileage`, `lng`, and `lat` query parameters.

## Database migrations

```bash
# Generate a migration after changing an entity
npm run migration:generate -- src/migrations/MigrationName

# Show migration status
npm run migration:show

# Apply pending migrations
npm run migration:run

# Revert the latest migration
npm run migration:revert
```

Automatic schema synchronization is disabled outside the disposable test environment. Database changes are applied through versioned migrations.

## Testing and quality checks

```bash
npm test
npm run test:e2e
npm run test:cov
npm run lint
npm run build
```

## Deployment

The repository includes a `render.yaml` Blueprint for deploying the API as a Render Web Service in Singapore. Production uses a Neon PostgreSQL connection supplied through `DATABASE_URL`; Render generates the cookie-signing key automatically.

The deployment startup command applies pending TypeORM migrations before starting the NestJS server:

```bash
npm run start:render
```

Required production environment variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `COOKIE_KEY` | Cookie-session signing secret |
| `PORT` | HTTP port supplied automatically by Render |
