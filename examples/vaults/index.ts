import { client, listVaults } from '@credit-cooperative/platform-sdk';

const apiKey = process.env.CREDITCOOP_API_KEY;
if (apiKey) {
  client.setConfig({
    headers: { 'x-api-key': apiKey },
  });
}

const { data, error } = await listVaults({
  query: {
    networkId: 'eip155:1',
    expand: ['related-addresses', 'organization', 'apy'],
  },
});

if (error) {
  console.error('API error:', error);
  process.exit(1);
}

console.log('Vaults on eip155:1:');
console.log(JSON.stringify(data, null, 2));
