import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const RETURNS_URL = `${getBaseURL()}/returns`;

const saveReturn = async returnRental => {
  const { data } = await http.post(RETURNS_URL, returnRental);
  console.log("Return sucess", data);
  return data;
};

export { saveReturn };
