const urls = require("../Backend/urls");
document.getElementById("submit").addEventListener("click", async () => {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(firstname, lastname, email, password);

  await axios
    .post(`${urls.usersUri}`, {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
