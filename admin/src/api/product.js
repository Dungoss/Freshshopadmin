import {get, post, patch, destroy} from '../utils/FetchAPI';

export const getAllProductsAPI = (query) => get('/products', query);
export const getTopTenProductAPI = () => get('/products/top-ten');

export const getProductByPIDAPI = (pid) => get('/products/pid/'+pid);

export const createProductsAPI = (body) => post('/products', body);
export const updateProductAPI = (id, body) => patch('/products/'+id, body);
export const updateStatusProductAPI = (id, body) => patch('/products/status/'+id, body);


export const destroyProductAPI = (idProduct) => destroy('/products/'+idProduct);
