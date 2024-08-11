import axios from "axios";

async function GetRooms() {
  const base_uri = process.env.REACT_APP_BASE_URL_ROOMS;

  try {
    const response = await axios.get(base_uri);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default GetRooms;