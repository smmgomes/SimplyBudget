document.addEventListener("DOMContentLoaded", async () => {
  event.preventDefault();
  await axios
    .get(`http://localhost:3000/user/${window.localStorage.getItem("id")}`)
    .then((res) => {
      document.getElementById("name").value = "Hello, " + res.data.name + "!";
    })
    .catch((err) => {
      console.log(err.message);
    });
});
