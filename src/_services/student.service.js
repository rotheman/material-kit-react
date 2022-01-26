import axios from "axios";
import { SERVER_URL } from "../constants";
import authHeader from "./auth-header";

class StudentService {
  getStudentBoard() {
    return axios.get(SERVER_URL + "authentication/studentping", {
      headers: authHeader(),
    });
  }

  getStudentExams(date) {
    console.log("FETCH Data with student.service");
    return fetch(
      SERVER_URL + "assignments/show?type=exams&startDate=" + date,
      // SERVER_URL + "examBar/show?date=" + date.toISOString().split("T")[0],
      { headers: authHeader() }
    );
  }

  getStudentHomework(date) {
    console.log("FETCH Data with student.service");
    return fetch(
      SERVER_URL + "assignments/show?type=homeworks&startDate=" + date,
      // SERVER_URL + "homeworks/show?date=" + date.toISOString().split("T")[0],
      { headers: authHeader() }
    );
  }

  getStudentAssignments(startDate, endDate) {
    console.log("FETCH Data with student.service");
    console.log(
      "api call: " +
        SERVER_URL +
        "assignments/show?startDate=" +
        JSON.stringify(startDate).slice(1, 11) +
        "&endDate=" +
        (endDate === null
          ? JSON.stringify(startDate).slice(1, 11)
          : JSON.stringify(endDate).slice(1, 11))
    );
    return fetch(
      SERVER_URL +
        "assignments/show?startDate=" +
        JSON.stringify(startDate).slice(1, 11) +
        "&endDate=" +
        (endDate === null
          ? JSON.stringify(startDate).slice(1, 11)
          : JSON.stringify(endDate).slice(1, 11)),
      { headers: authHeader() }
    );
  }
  getAssignmentStatus(id) {
    console.log("FETCH Data with assignmentId: " + id);
    var result = fetch(
      SERVER_URL + "assignments/getStatus?assignmentId=" + id,
      { headers: authHeader() }
    );
    try {
      var object = result.getData;
      console.log("Das StatusResultat ist: " + object);
      return object;
    } catch (e) {
      object = 1;
      console.log("Das falsche StatusResultat ist: " + object);
      return object;
    }
  }
}

export default new StudentService();
