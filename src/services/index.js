import axios from "axios";
import axiosIntercepter from "./axiosIntercepter";

// export function PostData(isAuthenticated, apiUrl, data) {
//   let axiosConfig;
//   if (isAuthenticated) {
//     const { token } = JSON.parse(sessionStorage.getItem("authentication"));
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   } else {
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       let currentSchema = sessionStorage.getItem("currentSchema");
//       if (!currentSchema) {
//         return reject({ message: "Leagal Entity Not Found" });
//       }
//       let totalurl = `${process.env.REACT_APP_SERVER_PROTOCAL}${currentSchema}.${process.env.REACT_APP_SERVER_BASE_URL}${apiUrl}`;

//       const res = await axiosIntercepter.post(totalurl, data, axiosConfig);
//       resolve({ status: res.status, payload: res.data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function PutData(isAuthenticated, apiUrl, data) {
//   let axiosConfig;

//   if (isAuthenticated) {
//     const { token } = JSON.parse(sessionStorage.getItem("authentication"));
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   } else {
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       let currentSchema = sessionStorage.getItem("currentSchema");
//       if (!currentSchema) {
//         return reject({ message: "Leagal Entity Not Found" });
//       }

//       let totalurl = `${process.env.REACT_APP_SERVER_PROTOCAL}${currentSchema}.${process.env.REACT_APP_SERVER_BASE_URL}${apiUrl}`;

//       const res = await axiosIntercepter.put(totalurl, data, axiosConfig);
//       resolve({ status: res.status, payload: res.data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }


export async function PostData(apiUrl, data, isAuthenticated = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiUrl}`, data, { headers });
    return res.data;
  } catch (err) {
    throw err;
  }
}


export function PutData(isAuthenticated, apiUrl, data) {
  let axiosConfig;
axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

  return new Promise(async (resolve, reject) => {
    try {
      let totalurl=`${process.env.REACT_APP_BASE_URL}${apiUrl}`;
      const res = await axiosIntercepter.put(totalurl, data, axiosConfig);
      resolve({ status: res.status, payload: res.data });
    } catch (error) {
      reject(error);
    }
  });
}

// export function GetData(isAuthenticated, apiUrl) {
//   let axiosConfig;
//   if (isAuthenticated) {
//     const { token } = JSON.parse(sessionStorage.getItem('authentication'));
//     axiosConfig = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   } else {
//     axiosConfig = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//   }
//   return new Promise(async (resolve, reject) => {
//     try {
//       let currentSchema = sessionStorage.getItem('currentSchema');
//       if (!currentSchema) {
//         return reject({ message: 'Leagal Entity Not Found' });
//       }
//       let totalurl = `${process.env.REACT_APP_SERVER_PROTOCAL}${currentSchema}.${process.env.REACT_APP_SERVER_BASE_URL}${apiUrl}`;

//       const res = await axiosIntercepter.get(totalurl, axiosConfig);
//       resolve({ status: res.status, payload: res.data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export function GetData(apiUrl) {
  let axiosConfig;
  axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  return new Promise(async (resolve, reject) => {
    try {
      let totalurl=`${process.env.REACT_APP_BASE_URL}${apiUrl}`;
      const res = await axiosIntercepter.get(totalurl, axiosConfig);
      resolve({ status: res.status, payload: res.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function DeleteData(isAutheticated,apiUrl) {
  let axiosConfig;
  axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      let totalurl=`${process.env.REACT_APP_BASE_URL}${apiUrl}`;
      const res = await axiosIntercepter.delete(totalurl, axiosConfig);
      resolve({ status: res.status, payload: res.data });
    } catch (error) {
      reject(error);
    }
  });
}

// export function DeleteData(isAuthenticated, apiUrl) {
//   let axiosConfig;
//   if (isAuthenticated) {
//     const { token } = JSON.parse(sessionStorage.getItem("authentication"));
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   } else {
//     axiosConfig = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//   }
//   return new Promise(async (resolve, reject) => {
//     try {
//       let currentSchema = sessionStorage.getItem("currentSchema");
//       if (!currentSchema) {
//         return reject({ message: "Leagal Entity Not Found" });
//       }
//       let totalurl=`${process.env.REACT_APP_BASE_URL}${apiUrl}`
//       // let totalurl = `${process.env.REACT_APP_SERVER_PROTOCAL}${currentSchema}.${process.env.REACT_APP_SERVER_BASE_URL}${apiUrl}`;

//       const res = await axiosIntercepter.delete(totalurl, axiosConfig);
//       resolve({ status: res.status, payload: res.data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function PostDataMultipart(isAuthenticated, apiUrl, data) {
//   let axiosConfig;
//   if (isAuthenticated) {
//     const { token } = JSON.parse(sessionStorage.getItem('authentication'));
//     axiosConfig = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   } else {
//     axiosConfig = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     };
//   }

//   return new Promise(async (resolve, reject) => {
//     try {
//       let currentSchema = sessionStorage.getItem('currentSchema');
//       if (!currentSchema) {
//         return reject({ message: 'Leagal Entity Not Found' });
//       }
//       let totalurl = `${process.env.REACT_APP_SERVER_PROTOCAL}${currentSchema}.${process.env.REACT_APP_SERVER_BASE_URL}${apiUrl}`;

//       const res = await axiosIntercepter.post(totalurl, data, axiosConfig);
//       resolve({ status: res.status, payload: res.data });
//     } catch (error) {
//       console.log(error.message);
//       reject(error);
//     }
//   });
// }

// Without token
export async function PostDataMultipart(apiUrl, data) {
  try {
    const totalurl = `${process.env.REACT_APP_BASE_URL}${apiUrl}`;
    const res = await axios.post(totalurl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { status: res.status, payload: res.data };
  } catch (error) {
    throw error;
  }
};

// Without token
export async function PutDataMultipart(apiUrl, data) {
  try {
    const totalurl = `${process.env.REACT_APP_BASE_URL}${apiUrl}`;
    const res = await axios.put(totalurl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { status: res.status, payload: res.data };
  } catch (error) {
    throw error;
  }
}

export function WithoutTenantPostData(isAuthenticated, apiUrl, data) {
  let axiosConfig;
  if (isAuthenticated) {
    const { token } = JSON.parse(sessionStorage.getItem("authentication"));
    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_PROTOCAL +
          process.env.REACT_APP_SERVER_BASE_URL +
          apiUrl,
        data,
        axiosConfig
      );
      resolve({ status: res.status, payload: res.data });
    } catch (error) {
      reject(error);
    }
  });
}
