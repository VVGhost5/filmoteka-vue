import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_key = "7b328a00ac54b898dfd950b7d57d1ea0";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_key,
};

const getPopularMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day");

    return data.results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const getGenres = async () => {
  try {
    const { data } = await axios.get("/genre/movie/list");
    return data.genres;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const api = {
  getPopularMovies,
  getGenres,
};

export default api;
