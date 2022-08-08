import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;

// accessToken가 있는 경우 header에 accessToken 추가
if (accessToken) {
  axiosInstance.defaults.headers.common[
    // eslint-disable-next-line dot-notation
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}

export default axiosInstance;
