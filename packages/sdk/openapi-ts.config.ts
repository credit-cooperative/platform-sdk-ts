import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://api.creditcoop.xyz/docs/openapi.json',
  output: './src/generated',
  plugins: [
    {
      comments: true,
      enums: true,
      name: '@hey-api/typescript',
    },  
    {
      auth: true,
      name: '@hey-api/sdk',
      examples: {
        importSetup: ({ $, node }) =>
          $.new( 
            node.name, 
            $.object() 
              .pretty() 
              .prop('apiKey', $.literal('YOUR_API_KEY')), 
          ), 
      },
    }
  ],
});

