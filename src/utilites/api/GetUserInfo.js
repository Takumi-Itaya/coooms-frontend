import axios from "axios";

async function GetUserInfo(email, authToken) {
  const base_uri = 'http://localhost:8080/user';

  const params = {
    email: email
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'Bearer ' + authToken
  }
  try {
    const response = await axios.get(base_uri, {
      params : params,
      headers : headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default GetUserInfo;