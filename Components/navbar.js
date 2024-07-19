const createNavbar = () => {
  const navbarHTML = `
    <nav>
      <ul class="navBar">
        <li>
          <a href="../Budget/budget.html">
            <img class="theLogo" src="../images/sb_logo.PNG" />
          </a>
        </li>
        <li><a href="../SpendingLog/spendingLog.html">SpendingLog</a></li>
        <li><a href="../Savings/savings.html">Savings</a></li>
      </ul>
    </nav>
  `;

  const navbarContainer = document.getElementById("navbar-container");

  if (navbarContainer) navbarContainer.innerHTML = navbarHTML;
};

document.addEventListener("DOMContentLoaded", createNavbar);
