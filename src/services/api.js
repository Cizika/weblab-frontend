import axios from 'axios';

const api = axios.create({
    baseURL: 'https://weblab-backend.herokuapp.com/'
});

export default api;