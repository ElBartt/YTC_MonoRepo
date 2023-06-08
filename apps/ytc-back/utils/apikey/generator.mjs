import clipboardy from 'clipboardy';

function generateApiKey(length) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';
  for (let i = 0; i < length; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  apiKey = apiKey.slice(0, 12) + '-' + apiKey.slice(13, 38) + '_' + apiKey.slice(39, 49) + '-' + apiKey.slice(50, 54) + '_' + apiKey.slice(55);
  return apiKey;
}

let length = 64;
let apiKey = generateApiKey(length);

clipboardy.writeSync(apiKey);

console.warn(`Your apiKey is: ${apiKey}, it's already in your clipboard!`);
console.warn(`Just paste it!`);