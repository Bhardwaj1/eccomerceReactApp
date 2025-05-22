// import axios from 'axios';
// import { notify } from '../utility/notify';

// const axiosIntercepter = axios.create({ timeout: 30000 });

// // Map to store active request controllers
// // const pendingRequests = new Map();

// axiosIntercepter.interceptors.request.use(
//   (config) => {
//     // // Generate a unique key for the request
//     // const requestKey = `${config.method}-${config.url}`;

//     // // If a request with the same key already exists, cancel it
//     // if (pendingRequests.has(requestKey)) {
//     //   pendingRequests.get(requestKey).abort();
//     //   // console.log(`Previous request to ${config.url} canceled.`);
//     // }

//     // const abortController = new AbortController();
//     // config.signal = abortController.signal;

//     // pendingRequests.set(requestKey, abortController);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosIntercepter.interceptors.response.use(
//   (response) => {
//     // console.log(`calling fron intercepter`);

//     // // Remove completed request from pending requests map
//     // const requestKey = `${response.config.method}-${response.config.url}`;
//     // pendingRequests.delete(requestKey);

//     return response;
//   },
//   async (error) => {
//     // // for abort controller
//     // const requestKey = `${error.config.method}-${error.config.url}`;
//     // pendingRequests.delete(requestKey);
//     // if (axios.isCancel(error)) {
//     //   // console.log('Request canceled:', error.message);
//     //   return Promise.reject(error);
//     // }
//     // // end abort controller
//     if (error?.response?.status === 401) {
//       let authData = JSON.parse(sessionStorage.getItem('authentication'));
//       await axios
//         .post(`${process.env.REACT_APP_SERVER_PROTOCAL}${process.env.REACT_APP_SERVER_BASE_URL}/token/refresh/`, {
//           refresh: authData?.refresh_token,
//         })
//         .then((data) => {
//           const newAccessToken = data.data.access;

//           error.config.headers = {
//             Authorization: `Bearer ${newAccessToken}`,
//           };
//           if (error?.config?.data) {
//             error.config.data = JSON.parse(error?.config?.data);
//           }
//           authData.token = newAccessToken;
//           sessionStorage.setItem('authentication', JSON.stringify(authData));
//         })
//         .catch((refreshTokenApiError) => {
//           notify("Token Expired. Please login again", "error");
//           return Promise.reject(refreshTokenApiError);
//         });
//       return axios(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// // end of old method
// export default axiosIntercepter;


import axios from 'axios';
import { notify } from '../utility/notify';

const axiosIntercepter = axios.create({
  timeout: 30000,
});

// Request Interceptor
axiosIntercepter.interceptors.request.use(
  (config) => {
    // No auth headers needed for now
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosIntercepter.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add basic error notification here
    if (error?.response?.status === 500) {
      notify("Server error occurred", "error");
    } else if (error?.response?.status === 404) {
      notify("Requested resource not found", "error");
    } else if (error?.response?.status === 400) {
      notify("Bad request. Please check your input.", "error");
    } else {
      notify(error?.message || "An error occurred", "error");
    }

    return Promise.reject(error);
  }
);

export default axiosIntercepter;

