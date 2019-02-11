import http from "./httpService";

// const MOVIE_URL = "http://store.banvuong.com/api/movies";
const MOVIE_URL = "http://localhost:3001/api/movies";

const getMovies = async () => {
  const { data } = await http.get(MOVIE_URL);
  console.log("Movies fetched\n", data);
  return data;
};

const getOneMovie = async movieId => {
  const { data } = await http.get(MOVIE_URL + "/" + movieId);
  console.log("Movie fetched\n", data);
  return data;
};

const saveMovie = async movie => {
  if (movie._id) {
    // passed in by state, hence if delete ._id directly, state will also be affected => clone it first
    const body = { ...movie };
    delete body._id;
    const { data } = await http.put(MOVIE_URL + "/" + movie._id, body);
    console.log("Movie updated", data);
    return data;
  }
  const { data } = await http.post(MOVIE_URL, movie);
  console.log("Movie created", data);
  return data;
};

const deleteMovie = async movieId => {
  return http.delete(MOVIE_URL + "/" + movieId);
};

export { getOneMovie, getMovies, deleteMovie, saveMovie };
