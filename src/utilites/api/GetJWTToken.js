import axios from "axios";

async function GetJWTToken(email, password) {
  const base_uri = process.env.REACT_APP_BASE_URL_LOGIN;

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