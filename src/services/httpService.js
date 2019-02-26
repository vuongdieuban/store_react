import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Unexpected error occurs", error);
    alert("An unexpected error occured");
  }

  return Promise.reject(error);
});

// called in authService.js to set headers to http requests before any http request is made
const setJwt = jwt => {
  if (jwt) {
    // set default header for every request
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
