import axios from "axios";

const BASE_URL = "https://i7a504.p.ssafy.io/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// accessToken가 있는 경우 header에 accessToken 추가
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  axiosInstance.defaults.headers.common[
    // eslint-disable-next-line dot-notation
    "Authenticate"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}

export default axiosInstance;

export const logout = () => {
  axiosInstance.get(`${BASE_URL}auth/logout`);
};
