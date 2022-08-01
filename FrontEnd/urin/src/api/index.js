import axios from "axios";

const BASE_URL = "https://i7a504.p.ssafy.io/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // TODO: header에 토큰 추가
});

export default axiosInstance;
