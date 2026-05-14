# @credit-cooperative/platform-sdk

Official TypeScript SDK for the Credit Cooperative platform API.

## Install

```sh
npm install @credit-cooperative/platform-sdk
```

## Usage

```ts
import { client, listVaults } from '@credit-cooperative/platform-sdk';

client.setConfig({
  baseUrl: 'https://api.creditcoop.xyz',
  // headers: { Authorization: `Bearer ${apiKey}` },
});

const { data } = await listVaults();
console.log(data);
```

## Examples

Runnable examples live in the
[`examples/`](https://github.com/credit-cooperative/platform-sdk-ts/tree/main/examples)
directory of the repository — listing networks, querying vaults, streaming
vault event logs over SSE, etc.

## Requirements

- Node.js 20+, or any modern browser (built on the standard `fetch` API — no
  Node-specific APIs in the SDK itself).

## Issues

Bug reports and feature requests:
[github.com/credit-cooperative/platform-sdk-ts/issues](https://github.com/credit-cooperative/platform-sdk-ts/issues).

## License

MIT
