import axios from 'axios';

var axiosInstance = axios.create({
    // baseURL: 'http://localhost:9000/'
    baseURL: '/',
    timeout: 3000,
});

// export default {
//     listEstados() {
//         return axiosInstance.get('/estado')
//             .then((response) => Promise.resolve(response.data))
//             .catch((error) => Promise.reject(error));
//     },
//     getEstado(data) {
//         return axiosInstance.get(`/estados/${data}`)
//             .then((response) => Promise.resolve(response))
//             .catch((error) => Promise.reject(error));
//     },
//     setEstado(id, data) {
//         return axiosInstance.put(`/estados/${id}`, data)
//             .then((response) => Promise.resolve(response))
//             .catch((error) => Promise.reject(error));
//     },
//     createEstado(data) {
//         return axiosInstance.post(`/estados/`, data)
//             .then((response) => Promise.resolve(response))
//             .catch((error) => Promise.reject(error));
//     },
// }
export default axiosInstance;