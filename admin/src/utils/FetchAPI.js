import axios from 'axios';
import {stringify} from 'querystring';

export const FetchAPI = async (path, method, headers, body, ObjectCancelAxios={}) => {
  const CancelToken = axios.CancelToken;
  const defaultHeaders = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
  };
  if (typeof headers === 'object') {
    Object.assign(defaultHeaders, headers);
  }
  try {
    return axios({
      url: process.env[`REACT_APP_BACKEND_${(process.env.NODE_ENV !== 'production' ? "DEV" : "PROD")}`] + path,
      method,
      headers: defaultHeaders,
      data: body,
      cancelToken: new CancelToken(c => {
        // this function will receive a cancel function as a parameter
        ObjectCancelAxios.cancel = c;
      })
    });
  } catch (error) {
    if (error.response && error.response.status !== 401) {
      return error.response;
    }
    if (!error.response) {
    } else {
      localStorage.removeItem('accessToken');
    }
    return {
      status: 401,
      error: error
      
    };
  }
};

export const get = (path, query = {}, headers = {}, body, ObjectCancelAxios={}) => {
  return FetchAPI(`${path}?${stringify(query)}`, 'GET', headers, body, ObjectCancelAxios);
};
export const post = (path, body, headers) => FetchAPI(path, 'POST', headers, body);
export const patch = (path, body, headers) => FetchAPI(path, 'PUT', headers, body);
export const destroy = (path, body, headers) => FetchAPI(path, 'DELETE', headers, body);
