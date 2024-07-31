import axios from "axios";

async function GetUserToken(email, password) {
  const base_uri = 'https://api.coooms.com/login';

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
export default GetUserToken;