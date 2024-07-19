const signUp = () => {
  const email = document.getElementById("email").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const password = document.getElementById("password").value;

  fetch("localhost:3000/users/allUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      console.log(res.body);
    })
    .catch((err) => {
      console.log(err.message);
    });

  //   fetch("https://localhost:3000/signup", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       firstname,
  //       lastname,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((res) => {
  //       res.json();
  //       location.href = "./logIn.html";
  //       console.log("User created");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
};

document.getElementById("submit").addEventListener("click", signUp);
