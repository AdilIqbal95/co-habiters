const req = require("./requests");
const forms = require("./forms");
const heading = document.querySelector('header');
const main = document.querySelector('main');

function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    // add greeting
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)
    
    // render add habit form
    const addHabitForm = document.createElement("div");
    addHabitForm.className = "form add-habit-form";
    const addHabitFormHeading = document.createElement("h2");
    addHabitFormHeading.textContent = "Track a habit";

    addHabitForm.appendChild(addHabitFormHeading);
    addHabitForm.appendChild(createAddHabitForm());

    // render create habit form
    const newHabitForm = document.createElement("div");
    newHabitForm.className = "form new-habit-form";
    const newHabitFormHeading = document.createElement("h2");
    newHabitFormHeading.textContent = "Create a new habit";

    newHabitForm.appendChild(newHabitFormHeading);
    newHabitForm.appendChild(createNewHabitForm());

    main.appendChild(addHabitForm);
    main.appendChild(newHabitForm);
}

function createAddHabitForm() {
    // form fields
    fields = [
        { tag: 'label', attributes: { class: 'add-habits-dropdown', for: 'habits-dropdown' }, text: 'I want to' },
        { tag: 'select', attributes:{ class: 'add-habits-dropdown', name: 'habits-dropdown'} },
        { tag: 'label', attributes: { class: 'add-habits-frequency', for: 'frequency' }, text: 'times per day' },
        { tag: 'input', attributes: { class: 'add-habits-frequency', name: 'frequency', type: 'number', placeholder: '3', min: "1", max: "24" } },
        { tag: 'input', attributes: { class: 'add-habits-btn', type: 'submit', name: 'habit-sbmt', value: 'Track Habit' } }
    ];

    const form = forms.createForm(fields);
    const freqInput = form.querySelector("input[name=frequency]");
    const habitsDropdown = form.querySelector("select");
    
    // add habits to dropdown     
    req.get('habits')
        .then(habits => {
            habits.forEach(habit => {
                const option = document.createElement("option");
                option.textContent = habit.name;
                option.setAttribute('data-id', habit.id);
                habitsDropdown.appendChild(option)
            })
        });

    // send
    form.onsubmit = (e) => {
        e.preventDefault();
        const data = {
            habit_id: habitsDropdown.getAttribute('data-id'),
            frequency: freqInput.value
        }
        req.addUserhabit(data);
    };

    return form;
}

function createNewHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'new-habit-name', for: 'new-habit-name' }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-name', name: 'new-habit-name', type: 'text', placeholder: 'use habite' }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt'} }
    ];

    const form = forms.createForm(fields);
    const nameInput = form.querySelector('input[type=text]');

    form.onsubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameInput.value
        }
        req.createHabit(data);
    };

    return form;
}

function createDeleteHabitForm() {
    // delete a user habit so it is no longer tracked
    // const deleteUserHabitBtn = document.createElement('button');
    // deleteUserHabitBtn.setAttribute('class', 'far fa-trash-alt delete-habit-btn')
    // deleteUserHabitBtn.onclick = () => deleteUserHabit(habit_id);
    // divWhereHabitIs.appendChild(deleteUserHabitBtn);
}

module.exports = { renderAddHabitsPage };