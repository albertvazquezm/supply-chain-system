# Supply Chain System Monorepo

This monorepo includes a NestJS API, supporting OpenAPI schema and JSON Schema definitions for DTOs. It also includes a NextJS app that uses the API.

As the project has been created using a very limited amount of time, there are key features missing for any production application. They are listed in the [Missing Features](#missing-features) section.

The rest of the features required for the project are implemented.

## Features

- [x] Create and update supply chain items
- [x] Create and retrieve supply chain item events
- [x] Shortcut to retieve latest location of an event
- [x] Exposed Swagger UI for API documentation
- [x] OpenApi support on the API
- [x] NextJS app with a focus on UX
- [x] Mobile responsive design (basic implementation)
- [x] Dockerfiles for production deployment of API and APP

## Setup

```bash
npm install
```

## Development

Run both the API and the app in development mode:

```bash
npm run dev:all
```

Run the API in development mode:

```bash
npm run dev:api
```

Run the app in development mode:

```bash
npm run dev:app
```

## Production

### Docker

Both the API and APP have dockerfiles that can be used to build the production images.

```bash
docker build -t supply-chain-api -f packages/api/Dockerfile .
docker build -t supply-chain-app -f packages/app/Dockerfile .
```

To run the production images, you can use the following commands:

```bash
docker run -p 4000:4000 supply-chain-api
docker run -p 3000:3000 supply-chain-app
```

## Missing Features

- [ ] A comprehensive logging system
- [ ] Shared types package for API DTOs (either generating an SDK using openapi schema or creating a shared package)
- [ ] Authentication and security
- [ ] API Error handling, including form validation errors
- [ ] Unit and end to end tests
- [ ] Better SSR support for the frontend
- [ ] Modal URLs don't support refresh (some config would be needed to support it)