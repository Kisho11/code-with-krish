import React, { useState, useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import OrderTable from '../components/OrderTable';
import orderService from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (order) => {
    try {
      setLoading(true);
      await orderService.createOrder(order);
      await fetchOrders();
      setToast({ message: 'Order placed successfully!', type: 'success' });
    } catch (err) {
      console.error('Error creating order:', err);
      setToast({ message: 'Failed to place order', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      setLoading(true);
      await orderService.updateOrderStatus(id, status);
      await fetchOrders();
      setToast({ message: 'Order status updated successfully!', type: 'success' });
    } catch (err) {
      console.error('Error updating order status:', err);
      setToast({ message: 'Failed to update order status', type: 'error' });
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
      <h1>Order Management</h1>
      
      {toast && (
        <div role="alert">
          {toast.message}
        </div>
      )}

      <section>
        <h2>Place New Order</h2>
        <OrderForm onSubmit={handleCreateOrder} />
      </section>

      <section>
        <h2>Order List</h2>
        
        {loading && <p>Loading orders...</p>}
        
        {error && <div role="alert">{error}</div>}
        
        {!loading && !error && (
          <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
        )}
      </section>
    </main>
  );
};

export default Orders;