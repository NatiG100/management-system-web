import axios from 'axios';

const axiosClient = axios.create({
    responseType:"json"
});
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return Promise.reject({message:"Client Error"});
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response?.data;
    }, function (error) {
      return Promise.reject(error?.response?.data);
});

export default axiosClient;