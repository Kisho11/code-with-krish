import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import customerService from '../services/customerService';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async (customer) => {
    try {
      setLoading(true);
      await customerService.createCustomer(customer);
      await fetchCustomers();
      setToast({ message: 'Customer created successfully!', type: 'success' });
    } catch (err) {
      console.error('Error creating customer:', err);
      setToast({ message: 'Failed to create customer', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <main>
      <h1>Customer Management</h1>
      
      {toast && (
        <div role="alert">
          {toast.message}
        </div>
      )}

      <section>
        <h2>Add New Customer</h2>
        <CustomerForm onSubmit={handleCreateCustomer} />
      </section>

      <section>
        <h2>Customer List</h2>
        
        {loading && <p>Loading customers...</p>}
        
        {error && <div role="alert">{error}</div>}
        
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4}>No customers found</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address || 'N/A'}</td>
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

export default Customers;