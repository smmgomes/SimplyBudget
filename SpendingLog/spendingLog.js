function del(id) {
  axios
    .delete(`http://localhost:3000/log/${id}`)
    .then((res) => {
      console.log(res.data);
      render_list();
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}

async function render_list() {
  try {
    const res = await axios.get(`http://localhost:3000/alllogs`);
    const logDOM = document.getElementById("log_list");
    let htmlString = "";

    res.data.logs.forEach((log) => {
      const logHTML = `
      <div class="log_list_item">
        <a class="dateTitle" href="../IndividualLog/individualLog.html?id=${encodeURIComponent(
          log._id
        )}">
          ${log.duration_date[0]} to ${log.duration_date[1]}
        </a>
        <img class="deleteButton" src="../images/cross-svgrepo-com.svg" width="45" onclick="del('${
          log._id
        }')">
      </div>
    `;
      htmlString += logHTML;
    });

    logDOM.innerHTML = htmlString;
  } catch (err) {
    console.log(err.response.data.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render_list();
});
