import { inventoryApi } from './api';

export const productService = {
  async getAllProducts() {
    const response = await inventoryApi.get('/products');
    return response.data;
  },

  async getProductById(id) {
    const response = await inventoryApi.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(product) {
    const response = await inventoryApi.post('/products', product);
    return response.data;
  },

  async validateStock(id, quantity) {
    const response = await inventoryApi.get(`/products/${id}/validate?quantity=${quantity}`);
    return response.data;
  },

  async reduceQuantity(id, quantity) {
    const response = await inventoryApi.patch(`/products/${id}/quantity`, { quantity });
    return response.data;
  }
};

export default productService;