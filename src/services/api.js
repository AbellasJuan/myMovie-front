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

const api ={
  createUser,
  login
};

export default api;