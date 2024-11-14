This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment folder

Move into environment folder:

```bash
cd environment
```

#### Docker environment

copy `.env.example` to `.env` and fill in the values.

Prefilled values from `.env.example` are already in sync with the docker containers. You just need to fill the empty one for your development environment.

Then start the docker containers:

```bash
docker-compose up -d
```

### App folder

Move into app folder:

```bash
cd app
```

#### Install dependencies

```bash
pnpm install
```

#### Push database schemas

```bash
pnpm db:push
```

#### Run the project

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Install shadcnUI components

```bash
pnpm ui:add
```

#### Pre-commit

Please ensure that all the following commands pass before committing your changes.

```bash
pnpm lint:fix

pnpm format:fix

pnpm typecheck
```

#### Experimental features

Run the following command to check for unused files:

```bash
pnpm knip
```

## Services

### DB studio

Run the following command to start the DB studio:

```bash
pnpm db:studio
```

Open [https://local.drizzle.studio](https://local.drizzle.studio) with your browser to see the DB navigator.

### Minio

Open [http://localhost:9001](http://localhost:9001) with your browser to see the Minio console.

The credentials are:

- username: `minio`
- password: `password`

## Editor configuration

### VSCODE

```json
{
  ...
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "always",
    "source.organizeImports": "always",
    "source.addMissingImports": "always"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.autoImports": true,
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": true,
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "always",
  ...
}
```
