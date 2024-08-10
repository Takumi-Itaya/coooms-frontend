import axios from "axios";

async function GetRooms() {
  const base_uri = 'https://api.coooms.com/rooms'; //本番環境
  // const base_uri = 'http://localhost:8080/rooms';　//開発環境
  try {
    const response = await axios.get(base_uri);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default GetRooms;