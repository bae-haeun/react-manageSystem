import axios from "./index";

export function lookupHistory(query) {
  return axios.get("/history", {
    params: query,
  });
}

export function createHistory(data) {
  return axios.post("/history", data);
}

export function updateHistory(historyId, data) {
  return axios.put(`/history/${historyId}`, data);
}

export function deleteHistory(historyId) {
  return axios.delete(`/history/${historyId}`);
}

export function searchOption() {
  return axios.get("/history/searchOption");
}
