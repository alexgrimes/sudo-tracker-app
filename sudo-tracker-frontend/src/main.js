let addHabit = false;
let addFriend = false;
const habitsContainer = document.querySelector(".habits-ul");
const friendsContainer = document.querySelector(".friends-ul");
const userNameContainer = document.querySelector(".name-container");
const daysStraightContainer = document.querySelector(".days-straight-ul");
const addHabitButton = document.querySelector(".add-habit-button");
const addFriendButton = document.querySelector(".add-friend-button");
const addHabitForm = document.querySelector(".add-habit-form");
const addFriendForm = document.querySelector(".add-friend-form");
const loginForm = document.querySelector(".login-form");

///////////////////FUNCTIONS///////////////////////

function main() {}

function fetchUserData(email) {
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
  fetch("http://localhost:3000/users/login", configObj)
    .then((resp) => resp.json())
    .then((userData) => {
      renderUserData(userData);
    })
    .catch((err) => console.log(err));
}

function renderUserData(userData) {
  userNameContainer.innerHTML = `
  <h1 data-user-id=${userData.id}>${userData.name}</h1>
  `;
  renderHabits(userData);
  renderFriends(userData);
}

function renderFriends(userData) {
  userData.accepted_relationships.forEach((friend) => {
    friendsContainer.innerHTML += `
    <li>${friend.name}</li>
    `;
  });
}
function renderHabits(userData) {
  userData.user_habits.forEach((habit) => {
    habitsContainer.innerHTML += `
      <li data-habit-id=${habit.id}>${habit.name}</li>
    `;

    daysStraightContainer.innerHTML += `
      <li>${habit.straight_days}</li>
    `;
  });
}

function toggleFormHandler() {
  addHabit = !addHabit;
  if (addHabit) {
    addHabitForm.style.display = "block";
  } else {
    addHabitForm.style.display = "none";
  }
}

function toggleFriendHandler() {
  addFriend = !addFriend;
  if (addFriend) {
    addFriendForm.style.display = "block";
  } else {
    addFriendForm.style.display = "none";
  }
}
function loginHandler() {
  event.preventDefault();
  const email = event.target["email"].value;
  fetchUserData(email);
  event.target.reset();
}

function newHabitHandler() {
  event.preventDefault();
  const habitName = event.target["name"].value;
  const habitDescription = event.target["description"].value;
  submitNewHabit(habitName, habitDescription);
  event.target.reset();
}

function newFriendHandler() {
  event.preventDefault();
  const email = event.target["email"].value;
  submitNewFriend(email);
  event.target.reset();
}

function submitNewFriend(email) {
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
  fetch("http://localhost:3000/friendships", configObj)
    .then((resp) => resp.json())
    .then((friend) => {
      friendsContainer.innerHTML += `
    <li>${friend.name}</li>
    `;
    })
    .catch((err) => console.log(err));
}

function submitNewHabit(habitName, habitDescription) {
  const userId = userNameContainer.children[0].dataset.userId;

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: habitName,
      description: habitDescription,
      id: userId,
    }),
  };
  fetch("http://localhost:3000/habits", configObj)
    .then((resp) => resp.json())
    .then((habit) => {
      habitsContainer.innerHTML += `
      <li data-habit-id=${habit.id}>${habit.name}</li>
    `;

      daysStraightContainer.innerHTML += `
      <li>0</li>
    `;
    })
    .catch((err) => console.log(err));
}

///////////////////EVENT LISTENERS///////////////////////
addHabitButton.addEventListener("click", toggleFormHandler);
addFriendButton.addEventListener("click", toggleFriendHandler);
addHabitForm.addEventListener("submit", newHabitHandler);
addFriendForm.addEventListener("submit", newFriendHandler);
loginForm.addEventListener("submit", loginHandler);

///////////////////INVOCATIONS///////////////////////
main();
