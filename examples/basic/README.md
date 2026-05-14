# basic example

Calls `listNetworks()` against the live Credit Cooperative platform API.

## Run

From the repo root (one-time, also builds the SDK):

```sh
npm install
npm run build
```

Then from this folder:

```sh
export CREDITCOOP_API_KEY=...   # optional, only if the endpoint requires auth
npm start
```

Or from anywhere in the repo:

```sh
npm start --workspace=@credit-cooperative/example-basic
```

## How it links to the SDK

This example depends on `@credit-cooperative/platform-sdk: "*"`. Because the
repo root declares `"workspaces": ["packages/*", "examples/*"]`, npm sees a
workspace by that name in `packages/sdk/` and symlinks it here — so edits in
`../../packages/sdk/src/` are picked up after a rebuild (`npm run build` at
the root). The `"*"` range means this example never needs touching when the
SDK's version bumps.
