// src/services/schoolService.js
import axios from "axios";

const API_URL = "https://api-cua-ban.com"; // Thay bằng URL API thực tế của bạn

const getStats = () => {
  return axios.get(`${API_URL}/stats`);
};

// ... các hàm khác (getSchools, getSchoolById, ...)
