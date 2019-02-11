import http from "./httpService";

const GENRES_URL = "http://store.banvuong.com/api/genres";

const getGenres = async () => {
  const { data } = await http.get(GENRES_URL);
  console.log("Genres fetched\n", data);
  return data;
};

export { getGenres };
