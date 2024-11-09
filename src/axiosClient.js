import axios from "axios";
import { notify } from '@kyvg/vue3-notification';
import router from "./router";
const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
      "Accept": "application/json",
      //"Origin": "http://localhost:5173",
      //"Referer": "http://localhost:5173",
      
    },
    Origin: "localhost",
    Referer: "localhost",
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
});
client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // alert(error.response.data.message)
    if(error.response.status == 401){
      router.push({name: "login"});
    }
    notify({
        text: error.response.data.message,
        type: "error"
    })
    return Promise.reject(error);
  });
export default client;