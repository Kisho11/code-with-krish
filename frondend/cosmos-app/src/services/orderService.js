import { orderApi } from './api';

export const orderService = {
  async getAllOrders() {
    const response = await orderApi.get('/orders');
    console.log(response.data);
    return response.data;
  },

  async getOrderById(id) {
    const response = await orderApi.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(order) {
    const response = await orderApi.post('/orders', order);
    return response.data;
  },

};

export default orderService;