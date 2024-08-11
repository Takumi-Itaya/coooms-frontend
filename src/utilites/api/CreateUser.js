import axios from "axios";

async function CreateUser(email, password) {
  const base_uri = process.env.REACT_APP_BASE_URL_USER;
  
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