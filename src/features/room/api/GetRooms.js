import axios from "axios";
import { API_URL_ROOMS } from "config/env";

async function GetRooms() {
  const base_uri = API_URL_ROOMS;

  try {
    const response = await axios.get(base_uri);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default GetRooms;