import React from 'react';


const OrderTable = ({ orders, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateTotal = (order) => {
    return order.items.reduce((total, item) => total + (item.quantity * (item.price || 0)), 0);
  };

  const handleStatusChange = (id, e) => {
    onUpdateStatus(id, e.target.value);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7}>No orders found</td>
            </tr>
          ) : (
            orders.map((order) => {
              const customerDetails = order.customerDetails;
              
              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    {customerDetails ? (
                      <>
                        <div>{customerDetails.name}</div>
                        <div>{customerDetails.email}</div>
                      </>
                    ) : (
                      `Customer ID: ${order.customerId}`
                    )}
                  </td>
                  <td>{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${order.status || 'pending'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          Product #{item.productId}: {item.quantity} x ${item.price || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${calculateTotal(order)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;