import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const CUSTOMERS_URL = `${getBaseURL()}/customers`;

const getAllCustomers = async () => {
  const { data } = await http.get(CUSTOMERS_URL);
  console.log("Customers fetched\n", data);
  return data;
};

export { getAllCustomers };
