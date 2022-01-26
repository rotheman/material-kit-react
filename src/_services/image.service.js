import axios from "axios";
import { SERVER_URL } from "../constants";
import authHeader from "./auth-header";

class ImageService {
  upload(imageData) {
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .post(SERVER_URL + "update/" + user.id + "/avatar", imageData, {
        headers: {
          Authorization: "Bearer " + user.planBarToken,
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  getCurrentAvatar() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      axios.get(SERVER_URL + "update/currentavatar",
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response.data);
      // response.data;
    })
    );
  }
}

export default new ImageService();
