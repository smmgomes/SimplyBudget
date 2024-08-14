document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("User ID not found");
    return;
  }
  await axios
    .get(`http://localhost:3000/user/${id}`)
    .then((res) => {
      document.getElementById("name").textContent =
        "Hello, " + res.data.data.firstname + "!";
    })
    .catch((err) => {
      console.log(err.message);
    });
});

document.getElementById("submit").addEventListener("click", async () => {
  event.preventDefault();
  let income = document.getElementById("income");
  let duration_from = document.getElementById("duration_from");
  let duration_to = document.getElementById("duration_to");
  let budget = document.getElementById("budget");

  await axios.post(`http://localhost:3000/`);
});
