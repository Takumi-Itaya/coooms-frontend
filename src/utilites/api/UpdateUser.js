import axios from "axios";

async function UpdateUser(userInfo, jwtToken) {
  const base_uri = process.env.REACT_APP_BASE_URL_USER;

  const headers = {
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'Bearer ' + jwtToken
  }

  const user_info = {
    id: userInfo.id,
    email : userInfo.email,
    password : userInfo.password,
    total_time : userInfo.total_time
  };

  try {
    await axios.put(base_uri, user_info, {
      headers : headers,
    });
  } catch (error) {
    throw error;
  }
}
export default UpdateUser;