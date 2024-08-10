import axios from "axios";

async function CreateUser(email, password) {
  const base_uri = 'https://api.coooms.com/user'; //本番環境
  // const base_uri = 'http://localhost:8080/user';　//開発環境

  const user_info = {
    email : email,
    password : password,
    total_time : 0,
  };

  try {
    await axios.post(base_uri, user_info);
  } catch (error) {
    throw error;
  }
}
export default CreateUser;