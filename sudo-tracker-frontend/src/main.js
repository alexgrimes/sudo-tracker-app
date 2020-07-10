let addHabit = false;
let addFriend = false;
let modalOpen = true;
let friendModalOpen = false;

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
const modalBody = document.querySelector(".modal-body");
const modalFriendBody = document.querySelector(".friend-modal-body");
const alertContainer = document.querySelector(".alert-container");
const welcomeAlertContainer = document.querySelector(
  ".welcome-alert-container"
);

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
      handleInvalidLogin(userData);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleInvalidLogin(userData) {
  if (userData === null) {
    modalBody.append("Sorry we can't find that email");
  } else {
    modalOpen = false;
    modalHandler();
    renderUserData(userData);
  }
}

function renderUserData(userData) {
  renderWelcomeAlert();
  userNameContainer.innerHTML = `
  <h1 data-user-id=${userData.id}>Welcome, ${userData.name}!</h1>
  `;

  renderHabits(userData);
  renderFriends(userData);
}

function renderWelcomeAlert() {
  welcomeAlertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  Mark your habits as completed by clicking on them!
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
}

function renderFriends(userData) {
  userData.accepted_relationships.forEach((friend) => {
    friendsContainer.innerHTML += `
    <tr><td data-friend-id=${friend.id}>${friend.name}</td></tr>
    `;
  });
}
function renderHabits(userData) {
  let index = 0;
  userData.user_habits.forEach((habit) => {
    habitsContainer.innerHTML += `
        <tr><td id=${index} data-user-habit-id=${habit.user_habit_id}>${habit.name}<button data-habit-id=${habit.habit_id} id='btn-delete' class="btn btn-danger btn-sm">x</button></td> </tr>
        
    `;

    daysStraightContainer.innerHTML += `
      <tr><td>${habit.straight_days}</td></tr>
    `;
    index++;
  });
}

function renderFriendsHabits(friendId) {
  fetch("http://localhost:3000/users" + "/" + friendId)
    .then((resp) => resp.json())
    .then((friendData) => renderFriendModal(friendData))
    .catch((err) => console.log(err));
}

function renderFriendModal(friendData) {
  // Clear the modal
  modalFriendBody.innerHTML = "";
  // Show the modal
  $("#friendModal").modal("show");
  // Render name
  const friendModalTittle = document.querySelector(".friend-modal-title");
  friendModalTittle.innerText = friendData.name;
  // Render profile picture
  modalFriendBody.innerHTML += `
    <img src=${friendData.img_url}  width="215px" height="200px"/>
  `;
  modalFriendBody.innerHTML += `<hr>`;
  // Render titles
  modalFriendBody.innerHTML += `<h4>Habits</h4>`;
  // Render Habits and Straight Days
  friendData.user_habits.forEach((habit) => {
    modalFriendBody.innerHTML += `
    <div><p>${habit.name}: ${habit.straight_days} straight days</p></div>
    `;
  });
}

////// FORM HANDLERS /////
function loginHandler() {
  event.preventDefault();
  const email = event.target["email"].value;
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

////// FORM SCRAPING FUNCTIONS /////
function newHabitHandler() {
  event.preventDefault();
  const habitName = event.target["name"].value;
  submitNewHabit(habitName);
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
      if (friend.error) {
        alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Seems like you tried to sign in as a user that is not registered. Please, try again.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      } else {
        friendsContainer.innerHTML += `
      <tr><td>${friend.name}</td></tr>
    `;
      }
    })
    .catch((err) => console.log(err));
}

function submitNewHabit(habitName) {
  const userId = userNameContainer.children[0].dataset.userId;

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: habitName,
      id: userId,
    }),
  };

  fetch("http://localhost:3000/habits", configObj)
    .then((resp) => resp.json())
    .then((habit) => {
      debugger;
      const index = habitsContainer.children.length;

      habitsContainer.innerHTML += `
      <tr><td id=${index} data-user-habit-id=${habit.user_habit_id}>${habit.name}<button data-habit-id=${habit.id} id='btn-delete' class="btn btn-danger btn-sm">x</button></td></tr>
      
    `;

      daysStraightContainer.innerHTML += `
      <tr><td>${habit.straight_days}</td></tr>
    `;
    })
    .catch((err) => console.log(err));
}

//// DELETE FUNCTIONS /////
function deleteHabit(event) {
  const habitId = parseInt(event.target.dataset.habitId);
  return fetch(`http://localhost:3000/habits/${habitId}`, { method: "DELETE" })
    .then((resp) => resp.json())
    .then((habit) => {
      const index = parseInt(event.target.parentElement.id);
      const liElement = daysStraightContainer.children[index];
      liElement.remove();
      event.target.parentElement.remove();
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

function friendModalHandler() {
  if (event.target.nodeName == "TD") {
    const friendId = event.target.dataset.friendId;
    renderFriendsHabits(friendId);
  }
}

///////////////////EVENT LISTENERS///////////////////////
addHabitButton.addEventListener("click", toggleHabitHandler);
addFriendButton.addEventListener("click", toggleFriendHandler);
addHabitForm.addEventListener("submit", newHabitHandler);
addFriendForm.addEventListener("submit", newFriendHandler);
loginForm.addEventListener("submit", loginHandler);
habitsContainer.addEventListener("click", addDaysStraight);
friendsContainer.addEventListener("click", friendModalHandler);

///////////////////INVOCATIONS///////////////////////
main();
