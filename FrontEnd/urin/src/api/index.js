import axios from "axios";

const BASE_URL = "https://i7a504.p.ssafy.io/api/v1/";
const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;

// accessToken가 있는 경우 header에 accessToken 추가
if (accessToken) {
  axiosInstance.defaults.headers.common[
    // eslint-disable-next-line dot-notation
    "Authenticate"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}

export default axiosInstance;
