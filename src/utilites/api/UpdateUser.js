import axios from "axios";

async function UpdateUser(id, email, password, total_time) {
  const base_uri = 'http://localhost:8080/user';

  const params = {
    id: id
  }

  const user_info = {
    id: id,
    email : email,
    password : password,
    total_time : total_time
  };

  try {
    await axios.put(base_uri + "?id=" + id, user_info);
  } catch (error) {
    throw error;
  }
}
export default UpdateUser;