let budget = document.getElementById("budget");
let spent_value = document.getElementById("spent_value");
let left = document.getElementById("left");

const getData = async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("Log not found");
    return;
  }
  await axios
    .get(`http://localhost:3000/log/${id}`)
    .then((res) => {
      left.textContent += res.data.left;
      spent_value.textContent += res.data.spent;
      budget.textContent += res.data.budget;
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  getData();
});
