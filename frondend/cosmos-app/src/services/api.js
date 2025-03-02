import axios from 'axios';

// Create base API instances for each service
export const customerApi = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const inventoryApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default {
  customerApi,
  inventoryApi,
  orderApi,
};