import { selector } from 'recoil';

const apiUrl = process.env.REACT_APP_API_URL;

async function getJsonFromApi(path) {
  console.log(`${apiUrl}/${path}`);
  const response = await fetch(`${apiUrl}/${path}`);
  return response.json();
}

export const everyFile = selector({
  key: 'everyFile',
  get: async () => await getJsonFromApi('files'),
});
