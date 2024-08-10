import axios from "axios";

async function GetUserInfo(jwtToken) {
  const base_uri = 'https://api.coooms.com/user';//本番環境
  // const base_uri = 'http://localhost:8080/user';　//開発環境

  const headers = {
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'Bearer ' + jwtToken
  }
  try {
    const response = await axios.get(base_uri, {
      headers : headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default GetUserInfo;