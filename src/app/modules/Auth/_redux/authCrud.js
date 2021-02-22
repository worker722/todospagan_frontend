import axios from "axios";
import { da } from "date-fns/locale";

export const LOGIN_URL = "http://192.168.109.67/api/login";
// export const REGISTER_URL = "api/auth/register";
export const REGISTER_URL = "http://192.168.109.67/api/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, phone_number, password) {
  const data = {
    email: email,
    fullname: fullname,
    phone_number: phone_number,
    password: password,
    is_company: 0,
    is_superadmin: 1,
    status: 'active',
    address_id: 1,
  }
  return axios.post(REGISTER_URL, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
