import http from "./httpService";
import jwtDecode from "jwt-decode";

const AUTH_URL = "http://store.banvuong.com/api/auth";
const tokenKey = "jwt";

// set JWT to header x-auth-token for all http request before any request is made
http.setJwt(getJwt());

const loginUser = async user => {
  // obtain jwt token
  const { data } = await http.post(AUTH_URL, {
    email: user.email,
    password: user.password
  });
  localStorage.setItem(tokenKey, data);
};

const loginWithJwt = jwt => {
  localStorage.setItem(tokenKey, jwt);
};

const logoutUser = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const user = jwtDecode(jwt);
    console.log("Current user", user);
    return user;
  }
  return null;
};

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default { loginUser, logoutUser, getCurrentUser, loginWithJwt };
