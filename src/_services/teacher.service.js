import axios from 'axios';
import { SERVER_URL } from '../constants';
import authHeader from './auth-header';


class TeacherService {

  getTeacherBoard() {
    return axios.get(SERVER_URL + 'authentication/teacherping', { headers: authHeader() });
  }
}

export default new TeacherService();
