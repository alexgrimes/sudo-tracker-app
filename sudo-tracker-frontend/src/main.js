const habitsContainer = document.querySelector(".habits-ul");
const userNameContainer = document.querySelector("#user-name");

function main() {
  fetchUserData();
}

function fetchUserData() {
  fetch("http://localhost:3000/users/2")
    .then((resp) => resp.json())
    .then((userData) => renderUserData(userData));
}

function renderUserData(userData) {
  userNameContainer.innerHTML = userData.name;
  renderUserHabits(userData);
}

function renderUserHabits(userData) {
  userData.habits.forEach((habit) => {
    habitsContainer.innerHTML += `
      <li>${habit.name}</li>
    `;
  });
}

main();
