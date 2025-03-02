import React, { useState, useEffect } from 'react';
import customerService from '../services/customerService';
import productService from '../services/productService';
// import './OrderForm.css';

const OrderForm = ({ onSubmit }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [orderItems, setOrderItems] = useState([
    { productId: 0, quantity: 1 },
  ]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersData, productsData] = await Promise.all([
          customerService.getAllCustomers(),
          productService.getAllProducts(),
        ]);
        setCustomers(customersData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrors({ api: 'Failed to load customers or products' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!selectedCustomerId) {
      newErrors.customerId = 'Please select a customer';
    }
    
    let hasValidItems = false;
    const itemErrors = {};
    
    orderItems.forEach((item, index) => {
      const itemError = {};
      
      if (!item.productId) {
        itemError.productId = 'Please select a product';
      }
      
      if (item.quantity <= 0) {
        itemError.quantity = 'Quantity must be greater than 0';
      }
      
      if (Object.keys(itemError).length > 0) {
        itemErrors[index] = itemError;
      } else {
        hasValidItems = true;
      }
    });
    
    if (!hasValidItems) {
      newErrors.items = 'At least one valid item is required';
    }
    
    setErrors({ ...newErrors, items: itemErrors });
    return Object.keys(newErrors).length === 0 && Object.keys(itemErrors).length === 0;
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomerId(e.target.value ? parseInt(e.target.value, 10) : '');
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    if (field === 'productId') {
      updatedItems[index].productId = parseInt(value, 10) || 0;
    } else if (field === 'quantity') {
      updatedItems[index].quantity = parseInt(value, 10) || 0;
    }
    setOrderItems(updatedItems);
  };

  const addItemRow = () => {
    setOrderItems([...orderItems, { productId: 0, quantity: 1 }]);
  };

  const removeItemRow = (index) => {
    if (orderItems.length > 1) {
      const updatedItems = [...orderItems];
      updatedItems.splice(index, 1);
      setOrderItems(updatedItems);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const validItems = orderItems.filter(item => item.productId > 0 && item.quantity > 0);
      const order = {
        customerId: selectedCustomerId,
        items: validItems,
      };
      onSubmit(order);
      
      setSelectedCustomerId('');
      setOrderItems([{ productId: 0, quantity: 1 }]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.api && (
        <div role="alert">{errors.api}</div>
      )}
      
      <div>
        <label htmlFor="customerId">Customer</label>
        <select
          id="customerId"
          value={selectedCustomerId}
          onChange={handleCustomerChange}
        >
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </select>
        {errors.customerId && <p role="alert">{errors.customerId}</p>}
      </div>
      
      <div>
        <label>Order Items</label>
        
        {orderItems.map((item, index) => (
          <div key={index} className="order-item">
            <div>
              <select
                value={item.productId || ''}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (${product.price}) - {product.quantity} in stock
                  </option>
                ))}
              </select>
              {errors.items && errors.items[index]?.productId && (
                <p role="alert">{errors.items[index].productId}</p>
              )}
            </div>
            
            <div>
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
              {errors.items && errors.items[index]?.quantity && (
                <p role="alert">{errors.items[index].quantity}</p>
              )}
            </div>
            
            <div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeItemRow(index)}
                disabled={orderItems.length === 1}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        {errors.items && typeof errors.items === 'string' && (
          <p role="alert">{errors.items}</p>
        )}
        
        <button
          type="button"
          className="add-button"
          onClick={addItemRow}
        >
          Add Another Item
        </button>
      </div>
      
      <div>
        <button type="submit" className="submit-button">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default OrderForm;