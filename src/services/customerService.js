import http from './httpService';

const apiEndpoint = '/customers';

export const getCustomers = () => {
  return http.get(apiEndpoint);
};
