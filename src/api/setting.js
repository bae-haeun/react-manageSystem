import axios from "./index";

export function getCustomer() {
  return axios.get("/customer");
}

export function addCustomer(data) {
  return axios.post("/customer", data);
}

export function updateCustomer(id, data) {
  return axios.put(`/customer/${id}`, data);
}
