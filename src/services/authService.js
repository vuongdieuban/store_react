import http from "./httpService";
import jwtDecode from "jwt-decode";

const AUTH_URL = "http://store.banvuong.com/api/auth";
const tokenKey = "jwt";

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

export default { loginUser, logoutUser, getCurrentUser, loginWithJwt };
