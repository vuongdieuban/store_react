import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const RENTALS_URL = `${getBaseURL()}/rentals`;

const getAllRentals = async () => {
  const { data } = await http.get(RENTALS_URL);
  console.log("Rentals fetched\n", data);
  return data;
};

const saveRental = async rental => {
  const { data } = await http.post(RENTALS_URL, rental);
  console.log("Rental created", data);
  return data;
};

export { getAllRentals, saveRental };
