const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')

const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');
// const newDiv = document.createElement('div').cloneNode();
// Landing Page flow
function renderLandingPage() {
    rHelpers.renderHeading();
    // rHelpers.renderAuthBtns();
    forms.renderLoginForm();
    forms.renderRegisterLink();
}

// *******************************************************************

// render profile page, main page:
// aysnc  
function renderStreaks() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    const greeting = document.createElement('h1')
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    heading.appendChild(greeting);

    // const getHabits = await getAllHabits();
    // if (getHabits.err) { return }
    // const renderHabit = habitData => {
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"
    const streaksBody = document.createElement('div')
    streaksBody.className = "streaks-body"
    // insert GET request for habit completed here

    main.appendChild(streaks)
    streaks.appendChild(streaksHeading)
    streaks.appendChild(streaksBody)
    // streaks.appendChild(getHabits)
}


async function renderMyHabits() {
    const habitsList = await requests.getAllHabits();
    if (habitsList.err) { return }

    const habits = document.createElement('div')
    habits.className = "habits-list"
    const habitsHeading = document.createElement('h2')
    habitsHeading.className = "habits-heading"
    habitsHeading.textContent = "💙 My Habits"
    const habitsContainer = document.createElement('div')
    habitsContainer.className = "habits-container"
    main.append(habits)
    // insert GET request for user habits here

    // let habitContainer = document.createElement('div')
    // habitContainer.className = "habit-container"
    habitsList.forEach(habit => {

        // function getHabitList
        let habitContainer = document.createElement('div')
        habitContainer.className = "habit-container"

        let habitName = document.createElement('p')
        habitName.textContent = habit.habit_name

        let habitFrequency = document.createElement('progress')
        habitFrequency.setAttribute('max', `${habit.frequency}`)
        habitFrequency.setAttribute('value', `${habit.frequency}`)

        let habitDelete = document.createElement('i')
        habitDelete.className = "far fa-trash-alt delete-btn"

        let habitIncreaseFrequency = document.createElement('i')
        habitIncreaseFrequency.className = "fas fa-plus increase-freq-btn"



        habitsContainer.appendChild(habitContainer)
        habitContainer.appendChild(habitName)
        habitContainer.appendChild(habitFrequency)
        habitContainer.appendChild(habitDelete)
        habitContainer.appendChild(habitIncreaseFrequency)

    })

    habits.appendChild(habitsHeading)
    habits.appendChild(habitsContainer)
}

function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)

    // getAllHabits -> name and put into options value / dropdown 

}

function renderMenuMessage() {
    const menuMessage = document.createElement('p');
    menuMessage.textContent = "Click or tap on the burger bar for more options";
    main.appendChild(menuMessage);

}

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page!  Try looking elsewhere ...";
    main.appendChild(error);
}


module.exports = { renderStreaks, renderMyHabits, renderAddHabitsPage, renderLandingPage, render404 }