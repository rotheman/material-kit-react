export default function authMockHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  if (user && user.mocknetzToken) {
    return { Authorization: 'Bearer ' + user.mocknetzToken, "Content-type": "application/json" }; // for Spring Boot back-end
  } else {
    return {};
  }
}
