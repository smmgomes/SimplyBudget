document.getElementById("submit").addEventListener("click", async () => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await axios
    .post(`http://localhost:3000/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      location.href = "../Budget/budget.html";
      window.localStorage.setItem("id", res.data._id);
      console.log("User logged in successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
