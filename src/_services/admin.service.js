import axios from 'axios';
import { SERVER_URL } from '../constants';
import authHeader from './auth-header';


class AdminService {

  getAdminBoard() {
    return axios.get(SERVER_URL + 'authentication/adminping', { headers: authHeader() });
  }
  updatePlanBarSubjects() {
    return axios.get(SERVER_URL + 'subjects/update', { headers: authHeader() });
  }
  updatePlanBarCourses() {
    return axios.get(SERVER_URL + 'courses/update', { headers: authHeader() });
  }

  updatePlanBarCourses
}

export default new AdminService();
