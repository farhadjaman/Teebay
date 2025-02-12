# TeeBay - Product Rental and Sales Platform

A full-stack application for renting and selling products, built with React, GraphQL, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn
- Git

## Project Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd App/Backend
```

2. Start the PostgreSQL database using Docker:
```bash
docker compose up
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env
```

5. Run database migrations:
```bash
npm run migrate:dev
```

6. Seed the database with initial data:
```bash
npm run seed
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

### Backend

- `npm run dev` - Start development server
- `npm run migrate:dev` - Run database migrations
- `npm run seed` - Seed database with initial data
- `npm run build` - Build for production
- `npm run start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Tech Stack

- **Frontend**: React, Apollo Client, shadcn/ui
- **Backend**: Node.js, Express, Apollo Server
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT
- **Type Safety**: TypeScript, Zod