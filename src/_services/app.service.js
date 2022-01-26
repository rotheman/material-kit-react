import axios from "axios";
import { SERVER_URL } from "../constants";
import authHeader from "./auth-header";

class AppService {
  getHolidays() {
    return axios.get(SERVER_URL + "holidays", { headers: authHeader() });
  }

  updateSubjects() {
    return axios.get(SERVER_URL + "update/subjects", { headers: authHeader() });
  }

  updateCourses() {
    return axios.get(SERVER_URL + "update/courses", { headers: authHeader() });
  }

  getSemesterData() {
    return axios.get(
      SERVER_URL + "semester/view?date=",
      //to be implemented when trying to toggle semester
      // +
      // JSON.stringify(date).slice(1, 11)
      { headers: authHeader() }
    );
  }
  activateDatabaseUpdate() {
    axios.get(SERVER_URL + "update", { headers: authHeader() });
  }
}

export default new AppService();
