# vault-logs-sse example

Streams vault event logs over Server-Sent Events using
`GET /v3/vaults/{id}/logs?format=event-stream`. First calls `listVaults()` with
`networkId: 'eip155:1', limit: 1` to pick a vault, then streams its logs. The
generated SDK only returns typed JSON, so this example reads the SDK's
`baseUrl` and `headers` via `client.getConfig()` and consumes the SSE stream
with `fetch` + a tiny parser (no extra dependencies — works on Node 20+ and in
modern browsers; the `process.env`/`process.exit` calls here are the only
Node-specific bits).

## Run

From the repo root (one-time, also builds the SDK):

```sh
npm install
npm run build
```

Then from this folder:

```sh
export CREDITCOOP_API_KEY=...   # optional, only if the vault's org is private
npm start
```

Or from anywhere in the repo:

```sh
npm start --workspace=@credit-cooperative/example-vault-logs-sse
```

Each `log` event is printed as it arrives; the process exits when the server
sends the final `done` event with the total count.
