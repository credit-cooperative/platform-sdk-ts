# vaults example

Calls `listVaults()` against the live Credit Cooperative platform API, filtering
to Ethereum mainnet (`eip155:1`) and expanding `related-addresses`,
`organization`, and `apy`.

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
npm start --workspace=@credit-cooperative/example-vaults
```
