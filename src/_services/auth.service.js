import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/authentication/authenticate";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL, {
        "email" : username,
        "password": password
      })
      .then(response => {
        if (response.data.planBarToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
