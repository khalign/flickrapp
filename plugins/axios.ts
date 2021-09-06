import axios from "axios";
import { FLICKR_API_URL } from "../constants/Config";

/**
 * It's not Artificial Intelligence, just an axios instance)
 * other configurations such as interceptors for adding tokens may be implemented here
 */

export const ai = axios.create({
  baseURL: FLICKR_API_URL,
});

ai.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error.response) // may set error state here if possible
);
