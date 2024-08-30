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
    let budget_value = Number(
        String(document.getElementById("budget").textContent).slice(1),
    );
    let spent_value = Number(
        String(document.getElementById("spent_value").textContent).slice(1),
    );
    let spentInput = Number(document.getElementById("SpentInput").value);
    let left_value = Number(
        String(document.getElementById("left").textContent).slice(1),
    );
    if (!spentInput){
        alert("There is no value given for the money that you spent")
        return
    }
    if (budget_value < spentInput) {
        alert(
            "The budget is lower than the amount you want to spend. The savings will be recalculated.",
        );
    }
    if (left_value < spentInput) {
        alert(
            "You have went negative for this particular budget duration. The savings will be recalculated.",
        );
    }
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        console.log("Log not found");
        return;
    }
    try {
        const res = await axios.put(`http://localhost:3000/log/${id}`, {
            spent: spent_value + spentInput,
            left: left_value - spentInput,
        });
        console.log(res)
        document.getElementById("spent_value").textContent = `$${res.data.spent}`;
        document.getElementById("SpentInput").value = "";
        document.getElementById("left").textContent = `$${res.data.left}`;
    } catch (err) {
        console.log(err);
    }
}

async function updateGotBack() {
    let spent_value = Number(
        String(document.getElementById("spent_value").textContent).slice(1),
    );
    let gotBackInput = Number(document.getElementById("GotBack").value);
    let left_value = Number(
        String(document.getElementById("left").textContent).slice(1),
    );
    if (spent_value < gotBackInput) {
        alert("The spent value will be negative since you got back more money.")
    }
    if (!gotBackInput){
        alert("There is no value given for the money that you got back")
        return
    }
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        console.log("Log not found");
        return;
    }
    try {
        const res = await axios.put(`http://localhost:3000/log/${id}`, {
            spent: spent_value - gotBackInput,
            left: left_value + gotBackInput,
        });
        console.log(res)
        document.getElementById("spent_value").textContent = `$${res.data.spent}`;
        document.getElementById("GotBack").value = "";
        document.getElementById("left").textContent = `$${res.data.left}`;
    } catch (err) {
        console.log(err);
    }
}
