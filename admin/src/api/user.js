import {get, patch, destroy} from '../utils/FetchAPI';

export const getAllUsersAPI = (query) => get('/users', query);
export const updateStatusUserAPI = (idUser, body) => patch('/users/status/'+idUser, body);
export const destroyUserAPI = (idUser) => destroy('/users/'+idUser);
