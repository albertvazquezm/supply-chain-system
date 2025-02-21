# Supply Chain System Monorepo

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

- [ ] Add a CI/CD pipeline to the project
- [ ] Add a database to the project
- [ ] Add authentication to the project
- [ ] Add authorization to the project
- [ ] Add a monitoring system to the project