let addHabit = false;
let addFriend = false;
let modalOpen = true;

///// CONTAINERS /////
const habitsContainer = document.querySelector("#habits-table");
const friendsContainer = document.querySelector("#friends-table");
const userNameContainer = document.querySelector(".name-container");
const daysStraightContainer = document.querySelector("#days-straight-table");

///// BUTTONS /////
const addHabitButton = document.querySelector("#add-habit-button");
const addFriendButton = document.querySelector("#add-friend-button");

///// FORMS /////
const addHabitForm = document.querySelector(".add-habit-form");
const addFriendForm = document.querySelector(".add-friend-form");
const loginForm = document.querySelector(".login-form");

///// MISC /////
let email_address = "";

///////////////////MAIN///////////////////////

function main() {
  modalHandler();
}

function modalHandler() {
  if (modalOpen) {
    $("#loginModal").modal("show");
  } else {
    $("#loginModal").modal("hide");
  }
}
function toggleLoginForm() {
  login = false;
  if (login === false) {
    loginForm.style.display = "none";
  }
}

///// FETCHING && RENDERING FUNCTIONS /////
function fetchUserData(email) {
  email_address = email;
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
      toggleLoginForm();
      renderUserData(userData);
    })
    .catch((err) => console.log(err));
}

function renderUserData(userData) {
  userNameContainer.innerHTML = `
  <h1 data-user-id=${userData.id}>Welcome, ${userData.name}!</h1>
  `;
  renderHabits(userData);
  renderFriends(userData);
}

function renderFriends(userData) {
  userData.accepted_relationships.forEach((friend) => {
    friendsContainer.innerHTML += `
    <tr><td>${friend.name}</td></tr>
    `;
  });
}
function renderHabits(userData) {
  let index = 0;
  userData.user_habits.forEach((habit) => {
    habitsContainer.innerHTML += `
        <tr><td id=${index} data-user-habit-id=${habit.user_habit_id}>${habit.name}</td> </tr>
    `;

    // <button data-habit-id=${habit.habit_id} id='btn-delete' class="btn btn-danger">Delete</button>
    debugger;
    daysStraightContainer.innerHTML += `
      <tr><td>${habit.straight_days}</td></tr>
    `;
    index++;
  });
}

////// FORM HANDLERS /////

function loginHandler() {
  event.preventDefault();
  const email = event.target["email"].value;
  modalOpen = false;
  modalHandler();
  fetchUserData(email);
  event.target.reset();
}

function toggleHabitHandler() {
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

////// FROM SCRAPING FUNCTIONS /////

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

///// NEW/CREATE FUNCTIONS /////

function submitNewFriend(email) {
  const userId = userNameContainer.children[0].dataset.userId;

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      id: userId,
    }),
  };

  fetch("http://localhost:3000/friendships", configObj)
    .then((resp) => resp.json())
    .then((friend) => {
      friendsContainer.innerHTML += `
      <tr><td>${friend.name}</td></tr>
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
      debugger;
      const index = habitsContainer.children.length;

      habitsContainer.innerHTML += `
      <tr><td id=${index} data-user-habit-id=${habit.user_habit_id}>${habit.name}</td></tr>
    `;

      daysStraightContainer.innerHTML += `
      <tr><td>${habit.straight_days}</td></tr>
    `;

      // <button data-habit-id=${habit.id}  class="btn btn-danger" id='btn-delete'>Delete</button>
      console.log(habit);
    })
    .catch((err) => console.log(err));
}

//// DELETE FUNCTIONS /////
function deleteHabit(event) {
  const habitId = parseInt(event.target.dataset.habitId);
  return fetch(`http://localhost:3000/habits/${habitId}`, { method: "DELETE" })
    .then((resp) => resp.json())
    .then((habit) => {
      const index = parseInt(event.target.previousElementSibling.id);
      const liElement = daysStraightContainer.children[index];
      liElement.remove();
      event.target.previousElementSibling.remove();
      event.target.remove();
    })
    .catch((err) => console.log(err));
}

//// UPDATE FUNCTIONS /////
function updateDaysStraight(event) {
  // Get index of item clicked
  const index = parseInt(event.target.id);
  // Use the index to get the days straight count and add one to it
  const tdElement = daysStraightContainer.children[index].firstElementChild;
  // Compute the new value
  const newValue = parseInt(tdElement.innerText) + 1;

  // Update the front end
  tdElement.innerHTML = newValue;
  // Get the userHabit Id in order to update backend
  const userHabitId = parseInt(event.target.dataset.userHabitId);
  // Update front end

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ straight_days: newValue }),
  };

  fetch("http://localhost:3000/user_habits/" + "/" + userHabitId, configObj)
    .then((resp) => resp.json())
    .then((userHabit) => {
      console.log(userHabit);
    })
    .catch((error) => console.log(error.message));
}

///// EVENT HANDLERS FUNCTIONS
function addDaysStraight() {
  if (event.target.nodeName === "TD") {
    updateDaysStraight(event);
  }
  if (event.target.id === "btn-delete") {
    deleteHabit(event);
  }
}

///////////////////EVENT LISTENERS///////////////////////
addHabitButton.addEventListener("click", toggleHabitHandler);
addFriendButton.addEventListener("click", toggleFriendHandler);
addHabitForm.addEventListener("submit", newHabitHandler);
addFriendForm.addEventListener("submit", newFriendHandler);
loginForm.addEventListener("submit", loginHandler);
habitsContainer.addEventListener("click", addDaysStraight);

///////////////////INVOCATIONS///////////////////////
main();
