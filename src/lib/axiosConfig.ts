import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOVIE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
  },
});

export default axiosInstance;
