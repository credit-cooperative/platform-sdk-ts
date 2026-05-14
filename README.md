# platform-sdk-ts

Monorepo for the Credit Cooperative TypeScript SDK.

## Layout

- [`packages/sdk`](./packages/sdk) — `@credit-cooperative/platform-sdk`, the published npm package
- [`examples/`](./examples) — runnable examples that depend on the SDK via npm workspaces

## Setup

```sh
npm install
npm run build
```

## Common tasks

```sh
# build the SDK
npm run build

# typecheck everything
npm run typecheck

# regenerate the SDK from the OpenAPI spec
npm run generate

# run an example
npm start --workspace=@credit-cooperative/example-basic
```

## Dev cycle

Examples import the SDK from `packages/sdk/dist/`, not source — so after
editing anything under `packages/sdk/src/`, you need to rebuild before the
example sees the change:

```sh
npm run build && npm start --workspace=@credit-cooperative/example-basic
```

For tighter iteration, run a watch build in one terminal and the example in
another:

```sh
# terminal 1 — rebuilds dist/ on save
npm run build -- --watch -w @credit-cooperative/platform-sdk

# terminal 2 — re-run after a rebuild completes
npm start -w @credit-cooperative/example-basic
```

## Adding a new package or example

Drop it into `packages/` or `examples/`. Workspaces are globbed
automatically — re-run `npm install` to pick it up.
