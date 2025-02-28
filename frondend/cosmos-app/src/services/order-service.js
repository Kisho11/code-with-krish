import axios from 'axios';


const baseurl = 'http://localhost:3030/orders';

export const createOrder = async (order) => { 
    return axios.post(baseurl, order);
}

export const getOrders = async () => {
    return axios.get(baseurl);
}