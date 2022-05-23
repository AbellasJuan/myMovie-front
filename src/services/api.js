import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

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

async function getReviewedMovies(userId, token, friendId ) {
  const config = createConfig(token);
  const movies = await axios.get(`${BASE_URL}/reviews/${userId}?friendId=${friendId}`, config);
  return movies;
};

async function getUsers(userName, token) {
  const config = createConfig(token);
  const users = await axios.get(`${BASE_URL}/user?userName=${userName}`, config);
  return users;
};

const api ={
  createUser,
  login,
  postReview,
  getUserInfo,
  getReviewedMovies,
  getUsers
};

export default api;