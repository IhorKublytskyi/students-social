import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: '/api/'
})

export default axiosConfig