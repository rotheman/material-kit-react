export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  if (user && user.planBarToken) {
    return {
      Authorization: "Bearer " + user.planBarToken,
      "Content-type": "application/json",
      'Accept': 'application/json'
    }; // for Spring Boot planBar back-end
  } else {
    return {};
  }
}
