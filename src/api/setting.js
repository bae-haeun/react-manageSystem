import axios from "./index";

//고객사 관리

//고객사 조회
export function getCustomer() {
  return axios.get("/customer");
}
//고객사 부서 조회 query: customer_id
export function getCustomerDept(query) {
  return axios.get("/customerDept", {
    params: query,
  });
}

//고객사 부서 수정
export function updateCustomerDept(data) {
  return axios.update("/customerDept", data);
}

export function addCustomer(data) {
  return axios.post("/customer", data);
}

export function updateCustomer(id, data) {
  return axios.put(`/customer/${id}`, data);
}
