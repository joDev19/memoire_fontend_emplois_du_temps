import axios from "axios";
const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
});
export default client;