import axios from "axios";

async function UpdateUser(userInfo, jwtToken) {
  const base_uri = 'https://api.coooms.com/user'; //本番環境
  // const base_uri = 'http://localhost:8080/user';　//開発環境

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