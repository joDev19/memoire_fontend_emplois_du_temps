import axios from "axios";
import { notify } from '@kyvg/vue3-notification';
const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
});
client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // alert(error.response.data.message)
    notify({
        text: error.response.data.message,
        type: "error"
    })
    return Promise.reject(error);
  });
export default client;