import { selector, selectorFamily } from 'recoil';
import axios from 'axios';
import { counterUpdatesState } from '../state/updates';
import queryString from 'query-string';

export const allFiles = selector({
  key: 'allFiles',
  get: async ({ get }) => {
    const { data } = get(apiIndex({ path: 'files' }));
    return data;
  },
});

export const apiIndex = selectorFamily({
  key: 'apiIndex',
  get: ({ path, filtro }) => ({ get }) => {
    get(counterUpdatesState(path));
    return getData(buildPath(path, filtro));
  },
});

export const buildPath = (path, filtro = {}) => {
  const query = queryString.stringify(filtro, { skipNull: true });
  return query ? `${path}?${query}` : `${path}`;
};

export const getData = async (path) => {
  return await makeApi().get(path);
};

const makeApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
