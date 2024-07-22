document.getElementById("submit").addEventListener("click", async () => {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(firstname, lastname, email, password);

  await fetch("http://localhost:3000/signup", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res
          .json()
          .then((err) => alert(err.message || "Email already exists"));
      }
      return res.json();
    })
    .then((data) => {
      console.log("User created", data);
      // location.href = "./logIn.html";
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      alert("An error occurred. Please try again.");
    });
});
