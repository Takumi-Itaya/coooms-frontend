import axios from "axios";

async function GetUserInfo(jwtToken) {
  const base_uri = process.env.REACT_APP_BASE_URL_USER;

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