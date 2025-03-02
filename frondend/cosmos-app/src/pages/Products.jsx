import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (product) => {
    try {
      setLoading(true);
      await productService.createProduct(product);
      await fetchProducts();
      setToast({ message: 'Product created successfully!', type: 'success' });
    } catch (err) {
      console.error('Error creating product:', err);
      setToast({ message: 'Failed to create product', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <main>
      <h1>Product Management</h1>
      
      {toast && (
        <div role="alert">
          {toast.message}
        </div>
      )}

      <section>
        <h2>Add New Product</h2>
        <ProductForm onSubmit={handleCreateProduct} />
      </section>

      <section>
        <h2>Product List</h2>
        
        {loading && <p>Loading products...</p>}
        
        {error && <div role="alert">{error}</div>}
        
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4}>No products found</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      {product.quantity}
                      {product.quantity <= 5 && (
                        <span>Low Stock</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Products;