import GetUserInfo from "./GetUserInfo";
import GetUserToken from "./GetUserToken";

async function requestLogin(email, password) {

  GetUserToken(email, password).then(auth_token => {
    if(auth_token !== '') {
      GetUserInfo(email, auth_token).then(user_info => {
        console.log(user_info);
        return user_info;
      })
    }
  })
  .catch(error => {
    throw error;
  })
}
export default requestLogin;