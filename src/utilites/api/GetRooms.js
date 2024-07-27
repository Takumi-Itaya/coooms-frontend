import axios from "axios";

async function GetRooms() {
  const base_uri = 'http://localhost:8080/rooms';
  try {
    const response = await axios.get(base_uri);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default GetRooms;