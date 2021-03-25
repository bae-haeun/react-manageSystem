import axios from "./index";

export function login(data) {
  return axios.post("user/login", data);
}

export function logout() {
  return axios.get("user/logout");
}
