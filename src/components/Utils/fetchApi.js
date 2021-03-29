import axios from 'axios';

const makeApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...makeOptions(),
  });

const makeOptions = () => {
  return {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };
};

export function useApi(path) {
  const api = makeApi();

  return {
    deleteById: async (id) => {
      const { data } = await api.delete(`${path}/${id}`);
      return data;
    },
  };
}
