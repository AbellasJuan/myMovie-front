import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }
};

async function createUser(user) {
  await axios.post(`${BASE_URL}/sign-up`, user);
};

async function login(data) {
  const token = await axios.post(`${BASE_URL}/sign-in`, data);
  return token;
};

async function postReview(data, token) {
  const config = createConfig(token);
  return axios.post(`${BASE_URL}/reviews`, data, config);
};

async function getUserInfo(id, token) {
  const config = createConfig(token);
  const user = await axios.get(`${BASE_URL}/user/${id}`, config);
  return user;
};

const api ={
  createUser,
  login,
  postReview,
  getUserInfo
};

export default api;