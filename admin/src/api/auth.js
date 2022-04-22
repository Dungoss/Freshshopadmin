import {get, post} from '../utils/FetchAPI';

export const signup = (data) => post('/auth/sign-up', data)
export const login = (data) => post('/auth/login', data)
export const logout = (data) => get('/logout', data)
