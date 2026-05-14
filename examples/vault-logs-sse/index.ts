import { client, listVaults } from '@credit-cooperative/platform-sdk';

const apiKey = process.env.CREDITCOOP_API_KEY;
if (apiKey) {
  client.setConfig({
    headers: { 'x-api-key': apiKey },
  });
}

const { data: vaultsData, error: vaultsError } = await listVaults({
  query: { networkId: 'eip155:1', limit: 1 },
});

if (vaultsError || !vaultsData?.vaults.length) {
  console.error('Failed to find a vault on eip155:1:', vaultsError);
  process.exit(1);
}

const vaultId = vaultsData.vaults[0].id;
console.log(`Using vault ${vaultId}\n`);

const { baseUrl, headers } = client.getConfig();
const url = `${baseUrl}/v3/vaults/${encodeURIComponent(vaultId)}/logs?format=event-stream`;

const response = await fetch(url, {
  headers: {
    ...(headers as Record<string, string> | undefined),
    accept: 'text/event-stream',
  },
});

if (!response.ok || !response.body) {
  console.error(`HTTP ${response.status}: ${await response.text()}`);
  process.exit(1);
}

console.log(`Streaming logs for vault ${vaultId}...\n`);

let count = 0;
let buffer = '';
const decoder = new TextDecoder();

for await (const chunk of response.body) {
  buffer += decoder.decode(chunk, { stream: true });

  let sep: number;
  while ((sep = buffer.indexOf('\n\n')) !== -1) {
    const raw = buffer.slice(0, sep);
    buffer = buffer.slice(sep + 2);

    let event = 'message';
    const dataLines: string[] = [];
    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
    }
    if (dataLines.length === 0) continue;

    const data = JSON.parse(dataLines.join('\n'));
    if (event === 'log') {
      count += 1;
      console.log(`[${count}] ${data.timestamp} ${data.eventType}`, data);
    } else if (event === 'done') {
      console.log(`\nDone. total=${data.total}`);
      process.exit(0);
    }
  }
}
