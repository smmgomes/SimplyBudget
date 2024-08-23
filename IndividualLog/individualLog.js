const getData = async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("Log not found");
    return;
  }
  await axios
    .get(`http://localhost:3000/log/${id}`)
    .then((res) => {
      document.getElementById("budget").textContent = `$${res.data.budget}`;
      document.getElementById("spent_value").textContent = `$${res.data.spent}`;
      document.getElementById("left").textContent = `$${res.data.left}`;
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  getData();
});

async function updateSpent() {
  let spent = Number(document.getElementById("Spent").value);
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("Log not found");
    return;
  }
  try {
    const budget = 
    const res = await axios.put(`http://localhost:3000/log/${id}`, {
      budget: getByID.data.budget,
      income: getByID.data.income,
      duration_date: getByID.data.duration_date,
      spent: Number(getByID.data.spent) + spent,
      left: Number(getByID.data.budget) - spent - Number(getByID.data.spent),
    });
    spent_value.textContent = `$${res.data.spent}`;
    left.textContent = `$${res.data.left}`;
  } catch (err) {
    console.log(err);
  }
}
async function updateGotBack() {
  let gotBack = Number(document.getElementById("GotBack").value);
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.log("Log not found");
    return;
  }
  try {
    const getByID = await axios.get(`http://localhost:3000/log/${id}`);
    const res = await axios.put(`http://localhost:3000/log/${id}`, {
      budget: getByID.data.budget,
      income: getByID.data.income,
      duration_date: getByID.data.duration_date,
      spent: Number(getByID.data.spent) - gotBack,
      left: Number(getByID.data.budget) + gotBack,
    });
    spent_value.textContent = `$${res.data.spent}`;
    left.textContent = `$${res.data.left}`;
  } catch (err) {
    console.log(err);
  }
}
