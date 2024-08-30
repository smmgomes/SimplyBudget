document.getElementById("submit").addEventListener("click", async () => {
  event.preventDefault();
  let income = Number(document.getElementById("income").value);
  let duration_from = document.getElementById("duration_from").value;
  let duration_to = document.getElementById("duration_to").value;
  let budget = Number(document.getElementById("budget").value);
  if (!income || !duration_from || !duration_to || !budget) {
    alert("Please fill in all fields");
    return;
  }
  await axios
    .post(`http://localhost:3000/addlog`, {
      income: income,
      duration_from: duration_from,
      duration_to: duration_to,
      budget: budget,
    })
    .then((res) => {
      console.log(res.data.message);
      alert("Budget has been added for viewing in the Spending Log");
    })
    .catch((err) => {
      console.log(err.response.data.message);
      alert("This spending log already exists");
    });
});
