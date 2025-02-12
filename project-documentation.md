# TeeBay - Product Rental and Sales Platform

## Project Overview
TeeBay is a full-stack application that enables users to both rent and sell products. The project follows the architecture and best practices inspired by the BulletProof React project structure, ensuring maintainability and scalability.

## Tech Stack & Dependencies

### Backend Infrastructure
- **Database**: PostgreSQL (Docker-containerized)
  - Managed through pgAdmin for easy database visualization
  - Containerized setup ensures consistent development environment
- **ORM**: Prisma
  - Type-safe database access
  - Simplified database migrations and schema management
- **API Layer**: Apollo Server
  - GraphQL-based API architecture
  - Structured resolvers and type definitions

### Frontend Technologies
- **API Client**: Apollo Client
  - Efficient state management
  - Built-in caching capabilities
- **Type Safety**: 
  - Zod for runtime type validation
  - TypeScript for static type checking
- **UI Components**: shadcn/ui library

## Implementation Details

### Part-1: Authentication

1. Then I modeled the User model in Prisma. After completing the authentication using the graphQL services, the user record would be added to the Postgres database. The authentication system implements a secure user registration and login mechanism using JWT tokens. The registration process validates user input through Zod schemas, checks for duplicate emails, and securely hashes passwords using bcrypt before storing them in a PostgreSQL database via Prisma ORM. The login flow verifies credentials, generating a 2-hour JWT token containing essential user information upon successful authentication. I have written this inside graphQL services.

2. Then I created GraphQL resolvers that would utilize the auth services to authenticate the user in the backend.

3. In the server.ts in the graphQL I have accumulated all the queries and mutations. I have exposed the graphQL mutations queries from the root index folder.

### Part-2: Product Management

1. In the backend to handle and create product, I created a product model at first, then created product resolvers and services to structure the graphQL query function, the graphQL service utilizes prisma orm to add a record in the product.

2. To handle the categories, I have added a category model, I have added a query resolver to get the categories from the app client graphQL.

3. In the frontend, The multi-step form implementation uses a state-driven approach to manage a five-step product creation flow. The form tracks its current step ("title", "categories", "description", "price", or "summary") using React's useState, while maintaining all form data in a single state object. Navigation between steps is handled by next/back functions that reference an ordered array of steps, with each step requiring validation before progression. The form's UI is dynamically rendered through a switch statement based on the current step, with the final step displaying a summary before submission. I have created graphQL client queries and mutation for both product and categories to get the categories and send the data over the server.

### Part-3: Transaction Management

1. For renting and selling the product and keeping the record I have created a transaction table in the database.

2. I have created the services to handle that would add transaction record to the server based on types (Renting and selling).

3. In the client, I have created mutations and queries to handle the transaction, created proper UI to showcase the transaction.

## Challenges: Ensuring Reusability and Data Consistency

### Reusability Challenge
I tackled the challenge of ensuring code reusability across the application by implementing reusable components, custom hooks, HOCs, and centralized configurations for routes and API services. This approach significantly reduced code duplication and improved maintainability of the application.

### Data Consistency Challenge
Maintaining data consistency between the client cache and database proved challenging, particularly for real-time updates after product modifications or deletions. I resolved this using Apollo Client's inline cache management and strategic refetch policies, ensuring the UI immediately reflects any data changes while maintaining optimal performance.

## Conclusion

By focusing on reusability, modularity, and performance, the frontend implementation became scalable and maintainable. The structured approach to routing not only improved developer experience but also enhanced the application's efficiency and user experience. These improvements ensure that future features can be integrated seamlessly without major refactors, making the project more adaptable to evolving requirements.