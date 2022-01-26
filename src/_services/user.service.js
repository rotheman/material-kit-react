import axios from 'axios';
import { SERVER_URL } from '../constants';
import authHeader from './auth-header';


class UserService {

  getHomeContent(){
    return axios.get(SERVER_URL + '/');
  }
  getPublicContent() {
    return axios.get(SERVER_URL + 'ping', {headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(SERVER_URL + 'authentication/success', { headers: authHeader() });
  }
}

export default new UserService();
