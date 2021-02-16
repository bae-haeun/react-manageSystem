import axios from './index'

export function addCustomer(data) {
    return axios.post('/customer', data)
}

export function updateCustomer(id, data) {
    return axios.put(`/customer/${id}`, data)
}
