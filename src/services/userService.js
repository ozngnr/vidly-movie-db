import http from './httpService';

const apiEndpoint = '/users';
const userUrl = (id) => (apiEndpoint + `/${id}`)

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
export function updateUser(payload) {
  return http.put(userUrl(payload._id), payload);
}