const habitsContainer = document.querySelector(".habits-ul");
const userNameContainer = document.querySelector("#user-name");
const daysStraightContainer = document.querySelector(".days-straight-ul");
const addHabitButton = document.querySelector(".add-habit-button")
const addHabitForm = document.querySelector(".add-habit-form")

///////////////////FUNCTIONS///////////////////////

function main() {
  fetchUserData();
}

function fetchUserData() {
  fetch("http://localhost:3000/users/4")
    .then((resp) => resp.json())
    .then((userData) => renderUserData(userData));
}

function renderUserData(userData) {
  userNameContainer.innerHTML = userData.name;
  renderUserHabits(userData);
  renderDaysStraight(userData);
}

function renderUserHabits(userData) {
  userData.habits.forEach((habit) => {
    habitsContainer.innerHTML += `
      <li data-habit-id=${habit.id}>${habit.name}</li>
    `;
  });
}

function renderDaysStraight(userData) {
  userData.user_habits.forEach((habit) => {
    daysStraightContainer.innerHTML += `
      <li>${habit.straight_days}</li>
    `;
  });
}


function toggleFormHandler(){
   
}

function newHabitHandler(){
  event.preventDefault()
  const habitName = event.target['name'].value
  const habitDescription = event.target['description'].value
  submitNewHabit(habitName, habitDescription)
  event.target.reset()
}




function submitNewHabit(habitName, habitDescription){
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: habitName,
      description: habitDescription
    })
  }
  fetch('http://localhost:3000/habits', configObj)
  .then(resp => resp.json())
  .then(habit => console.log(habit))
  .catch(err => console.log(err))
}



///////////////////EVENT LISTENERS///////////////////////
addHabitButton.addEventListener("click", toggleFormHandler)
addHabitForm.addEventListener("submit", newHabitHandler)


///////////////////INVOCATIONS///////////////////////
main();
