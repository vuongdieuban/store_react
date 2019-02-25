import http from "./httpService";

const USERS_URL = "http://store.banvuong.com/api/users";

const registerUser = async user => {
  return http.post(USERS_URL, {
    username: user.username,
    email: user.email,
    password: user.password
  });
};

export { registerUser };
