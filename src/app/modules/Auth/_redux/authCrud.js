import axios from "axios";
import { da } from "date-fns/locale";

export const BASE_URL = "http://192.168.109.67/api";
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

export function economic_agent_insert(company_data, commercial_references_data, agent_resident_details, shareholder_data, agent_document, agent_regulatory) {
  const data = {
    'company_data': company_data,
    'commercial_references_data': commercial_references_data,
    'agent_resident_details': agent_resident_details,
    'shareholder_data': shareholder_data,
    'agent_regulatory': agent_regulatory,
  }
  const formData = new FormData;
  if(agent_document) {
    for(var i = 0; i < agent_document['first_document'].length; i ++){
      formData.append('first_document[]', agent_document['first_document'][i]);
    }
    for(var i = 0; i < agent_document['second_document'].length; i ++){
      formData.append('second_document[]', agent_document['second_document'][i]);
    }
    for(var i = 0; i < agent_document['third_document'].length; i ++){
      formData.append('third_document[]', agent_document['third_document'][i]);
    }
    axios.post(`${BASE_URL}/economic_agent_upload_file`, formData);
  }
  
  return axios.post(`${BASE_URL}/economic_agent_insert`, data);
}

export function consumer_insert(user_info, personal_reference, labor_data, consumer_document, consumer_regulatory) {
  const data = {
    'user_info': user_info,
    'personal_reference': personal_reference,
    'labor_data': labor_data,
    'consumer_regulatory': consumer_regulatory,
  }
  const formData = new FormData;
  if(consumer_document) {
    for(var i = 0; i < consumer_document['first_document'].length; i ++){
      formData.append('first_document[]', consumer_document['first_document'][i]);
    }
    for(var i = 0; i < consumer_document['second_document'].length; i ++){
      formData.append('second_document[]', consumer_document['second_document'][i]);
    }
    for(var i = 0; i < consumer_document['third_document'].length; i ++){
      formData.append('third_document[]', consumer_document['third_document'][i]);
    }
    for(var i = 0; i < consumer_document['fourth_document'].length; i ++){
      formData.append('fourth_document[]', consumer_document['fourth_document'][i]);
    }
    axios.post(`${BASE_URL}/consumer_upload_file`, formData);
  }
  
  return axios.post(`${BASE_URL}/consumer_insert`, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
