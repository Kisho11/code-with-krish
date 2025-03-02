import React, { useState } from 'react';

const CustomerForm = ({ onSubmit, initialValues }) => {
  const [customer, setCustomer] = useState(
    initialValues || {
      name: '',
      email: '',
      address: '',
    }
  );

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(customer);
      if (!initialValues) {
        setCustomer({
          name: '',
          email: '',
          address: '',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
        />
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
        />
        {errors.email && <p role="alert">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          placeholder="Address (Optional)"
          value={customer.address || ''}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <button type="submit">
          {initialValues ? 'Update Customer' : 'Create Customer'}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;