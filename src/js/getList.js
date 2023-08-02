import axios from 'axios';

const URL = 'https://voodoo-sandbox.myshopify.com/products.json';

export const getList = async (mob, page) => {
  const per_page = mob ? 12 : 24;
  const response = await axios.get(`${URL}?limit=${per_page}&page=${page}`);
  return response;
};
