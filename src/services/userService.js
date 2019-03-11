import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const USERS_URL = `${getBaseURL()}/users`;

const registerUser = async user => {
  return http.post(USERS_URL, {
    username: user.username,
    email: user.email,
    password: user.password
  });
};

export { registerUser };
