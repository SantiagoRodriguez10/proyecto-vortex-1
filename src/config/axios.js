import axios from "axios";

const empleadoAxios = axios.create({
    baseURL: 'http://localhost:4000/'
})

export default empleadoAxios