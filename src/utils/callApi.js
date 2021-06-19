import axios from 'axios';

const defaultTimeout = 10000;

const callApi = (method, url, data = {}) => {
  const config = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: data.timeout || defaultTimeout,
    data,
  };

  axios.interceptors.response.use(
    response => response,
    error => {
      Promise.reject(error.response);
    },
  );

  return axios(config).then((response, error) => {
    if (error) return error;

    return response.data;
  });
};

export default callApi;
