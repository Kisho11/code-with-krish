import { customerApi } from './api';

export const customerService = {
  async getAllCustomers() {
    const response = await customerApi.get('/customers');
    return response.data;
  },

  async getCustomerById(id) {
    const response = await customerApi.get(`/customers/${id}`);
    return response.data;
  },

  async createCustomer(customer) {
    const response = await customerApi.post('/customers', customer);
    return response.data;
  },

};

export default customerService;