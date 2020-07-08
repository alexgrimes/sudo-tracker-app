let addHabit = false;
let addFriend = false;
let login = true;
const habitsContainer = document.querySelector(".habits-ul");
const friendsContainer = document.querySelector(".friends-ul");
const userNameContainer = document.querySelector(".name-container");
const daysStraightContainer = document.querySelector(".days-straight-ul");
const addHabitButton = document.querySelector(".add-habit-button");
const addFriendButton = document.querySelector(".add-friend-button");
const addHabitForm = document.querySelector(".add-habit-form");
const addFriendForm = document.querySelector(".add-friend-form");
const loginForm = document.querySelector(".login-form");
let email_address = '';
///////////////////FUNCTIONS///////////////////////

function main() {}

function toggleLoginForm() {
  login = false;
  if (login === false) {
    loginForm.style.display = "none";
  }
}

function fetchUserData(email) {
  email_address = email
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
  <h1 data-user-id=${userData.id}>${userData.name}</h1>
  `;
  renderHabits(userData);
  renderFriends(userData);
}

function renderFriends(userData) {
  userData.accepted_relationships.forEach((friend) => {
    friendsContainer.innerHTML += `
    <li>${friend.name}</li><p>${friend.straight_days}</p>
    `;
  });
}
function renderHabits(userData) {
  let count = 0;
  userData.user_habits.forEach((habit) => {
    habitsContainer.innerHTML += `
      <li id=${count} data-user-id=${habit.user_habit_id}>${habit.name}</li><button data-habit-id=${habit.habit_id} class='btn-delete'>Delete</button>
    `;

    daysStraightContainer.innerHTML += `
      <li>${habit.straight_days}</li>
    `;
    count++;
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
    .then(resp => resp.json())
    .then(habit => { 
      debugger
      const index = parseInt(habitsContainer.children[habitsContainer.children.length - 2].id) + 1;
      habitsContainer.innerHTML += `
      <li id=${index} data-user-id=${habit.user_habit_id}>${habit.name}</li><button data-habit-id=${habit.id} class='btn-delete'>Delete</button>
    `;

    daysStraightContainer.innerHTML += `
      <li>${habit.straight_days}</li>
    `;
      console.log(habit);
    })
    .catch(err => console.log(err));
}

function addDaysStraight() {
  if (event.target.nodeName === "LI") {
    updateDaysStraight(event);
  }
  if (event.target.className === 'btn-delete') {
    deleteHabit(event);
  }
}

function deleteHabit(event) {
  const habitId = parseInt(event.target.dataset.habitId)
  return fetch(`http://localhost:3000/habits/${habitId}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(habit => {
    const index = parseInt(event.target.previousElementSibling.id);
    const liElement = daysStraightContainer.children[index];
    liElement.remove();
    event.target.previousElementSibling.remove();
    event.target.remove();
  })
  .catch(err => console.log(err))
}

function updateDaysStraight(event) {
  // Get index of item clicked
  const index = parseInt(event.target.id);
  // Use the index to get the days straight count and add one to it
  const liElement = daysStraightContainer.children[index];
  // Compute the new value
  const newValue = parseInt(liElement.innerHTML) + 1;
  // Update the front end
  liElement.innerHTML = newValue;
  // Get the userHabit Id in order to update backend
  const userHabitId = parseInt(event.target.dataset.userId);
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

///////////////////EVENT LISTENERS///////////////////////
addHabitButton.addEventListener("click", toggleFormHandler);
addFriendButton.addEventListener("click", toggleFriendHandler);
addHabitForm.addEventListener("submit", newHabitHandler);
addFriendForm.addEventListener("submit", newFriendHandler);
loginForm.addEventListener("submit", loginHandler);
habitsContainer.addEventListener("click", addDaysStraight);

///////////////////INVOCATIONS///////////////////////
main();
