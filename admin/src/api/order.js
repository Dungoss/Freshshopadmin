import {get, post, patch, destroy} from '../utils/FetchAPI';

export const getAllOrderAPI = (query) => get('/orders', query);
export const createOrderAPI = (body) => post('/orders', body);
export const updateOrderAPI = (id, body) => patch('/orders/'+id, body);
export const updateStatusOrderAPI = (id, body) => patch('/orders/status/'+id, body);
export const destroyOrderAPI = (idOrder) => destroy('/orders/'+idOrder);
