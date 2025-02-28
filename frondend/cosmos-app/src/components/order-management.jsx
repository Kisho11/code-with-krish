import React, { useEffect } from 'react';
import {createOrder, getOrders} from '../services/order-service';
 

export default function OrderManagement() {

    const[customerId, setCustomerID] = React.useState("");
    const[productId, setProductID] = React.useState("");
    const[price, setPrice] = React.useState("");
    const[qty, setQuantity] = React.useState("");
    const[orders, setOrders] = React.useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Order Submitted");
        try {
            const order = {
                customerId,
                items: [
                    {
                        productId,
                        price,
                        quantity:qty
                    }
                ]
            }
           const response = await createOrder(order);
           console.log(response.data);
        } catch (error) {
            console.log(error);
            alert(error.name);
        }

    }

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }
    ,[])


    
    return (
        <div>
            <p>Create Order</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cus_id">Customer ID:</label>
                <input type="text" id="cus_id" name="cus_id" value={customerId} onChange={(e) => setCustomerID(e.target.value)}required></input>
                <br/>
                <label htmlFor="prod_id">Product ID</label>
                <input type="text" id="prod_id" name="prod_id" value={productId} onChange={(e) => setProductID(e.target.value)} required></input>
                <br/>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required></input>
                <br/>
                <label htmlFor="qty">QTY</label>
                <input type="text" id="qty" name="qty" value={qty} onChange={(e) => setQuantity(e.target.value)} required></input>
                <br/>
                <button type="submit">Submit</button>
            </form>

            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Order date</th>
                        <th></th>
                        <th></th>
                    </tr>

                    {orders && orders.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.customerId}</td>
                            <td>{item.createdAt.split("T")[0]}</td>
                            <td><button>Edit</button></td>
                            <td><button>View Item</button></td>
                        </tr>
                    ))}

                </table>
            </div>
        </div>
    );
}
