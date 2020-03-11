import axios from 'axios';
const api = axios.create({
    baseURL: "https://rockerseat-node.herokuapp.com/api"
});
export default api;