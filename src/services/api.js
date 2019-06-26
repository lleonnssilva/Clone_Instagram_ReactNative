import axios from "axios";

const api = axios.create({
  baseURL: "https://api-instagram-leo.herokuapp.com"
});

export default api;
