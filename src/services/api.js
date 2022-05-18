import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_URL;

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

const api ={
  createUser,
  login
};

export default api;