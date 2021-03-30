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
export function updateCustomerDept(data, id) {
  console.log("data", data);
  console.log("id", id);

  return axios.put(`/customerDept/${id}`, data);
}

//고객사 부서 삭제
export function deleteCustomerDept(id) {
  console.log(id);

  return axios.delete(`/customerDept/${id}`);
}

export function addCustomer(data) {
  return axios.post("/customer", data);
}

export function updateCustomer(id, data) {
  return axios.put(`/customer/${id}`, data);
}

//솔루션
export function getSolution() {
  return axios.get("/solution");
}

export function addSolution(data) {
  return axios.post("/solution", data);
}

export function updateSolution(id, data) {
  return axios.put(`/solution/${id}`, data);
}

export function deleteSolution(id, data) {
  return axios.delete(`/solution/${id}`, data);
}
