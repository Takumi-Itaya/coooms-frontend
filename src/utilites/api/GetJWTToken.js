import axios from "axios";

async function GetJWTToken(email, password) {
  const base_uri = 'https://api.coooms.com/login'; //本番環境
  // const base_uri = 'http://localhost:8080/login';　//開発環境

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