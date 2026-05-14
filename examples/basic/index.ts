import { client, listNetworks } from '@credit-cooperative/platform-sdk';

const apiKey = process.env.CREDITCOOP_API_KEY;
if (apiKey) {
  client.setConfig({
    headers: { 'x-api-key': apiKey },
  });
}

const { data, error } = await listNetworks();

if (error) {
  console.error('API error:', error);
  process.exit(1);
}

console.log('Supported networks:');
console.log(JSON.stringify(data, null, 2));
