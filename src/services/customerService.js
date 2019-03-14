import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const CUSTOMERS_URL = `${getBaseURL()}/customers`;

const getAllCustomers = async () => {
  const { data } = await http.get(CUSTOMERS_URL);
  console.log("Customers fetched\n", data);
  return data;
};

const saveCustomer = async customer => {
  const { data } = await http.post(CUSTOMERS_URL, customer);
  console.log("Customer created", data);
  return data;
};

export { getAllCustomers, saveCustomer };
