import axios from "axios";
import { API_URL_LOGIN } from "config/env";

async function GetJWTToken(email, password) {
  const base_uri = API_URL_LOGIN;

  const user_info = {
    email : email,
    password : password
  };

  try {
    const response = await axios.post(base_uri, user_info);
    return response.headers['x-auth-token'];
  } catch (error) {
    throw error;
  }
}
export default GetJWTToken;