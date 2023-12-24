import axios from 'axios';

const api = axios.create({

    //android studio
    //baseURL: 'http://10.0.2.2:8000/api/'

    //genymotion
    // baseURL: 'http://10.0.3.2:8000/api/'

     baseURL: 'http://localhost:8000/api/'
});

export default api;