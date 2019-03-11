import http from "./httpService";
import { getBaseURL } from "./getBaseURL";

const GENRES_URL = `${getBaseURL()}/genres`;

const getGenres = async () => {
  const { data } = await http.get(GENRES_URL);
  console.log("Genres fetched\n", data);
  return data;
};

export { getGenres };
