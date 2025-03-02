import React, { useState } from 'react';


const ProductForm = ({ onSubmit, initialValues }) => {
  const [product, setProduct] = useState(
    initialValues || {
      name: '',
      price: 0,
      quantity: 0,
    }
  );

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (product.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (product.quantity < 0 || !Number.isInteger(product.quantity)) {
      newErrors.quantity = 'Quantity must be a non-negative integer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 
            : name === 'quantity' ? parseInt(value, 10) || 0 
            : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(product);
      if (!initialValues) {
        setProduct({
          name: '',
          price: 0,
          quantity: 0,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          step="0.01"
          min="0"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        {errors.price && <p role="alert">{errors.price}</p>}
      </div>
      
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          min="0"
          step="1"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <p role="alert">{errors.quantity}</p>}
      </div>
      
      <div>
        <button type="submit">
          {initialValues ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;