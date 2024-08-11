import requestLogin from "./requestLogin";
import CreateUser from "./CreateUser";

async function requestSignin(email, password) {

  try {
    CreateUser(email, password).then(() => {
      requestLogin(email, password).then(user_info => {
        return user_info;
      })
    })
  } catch (error) {
    console.error(error);
  }
}
export default requestSignin;