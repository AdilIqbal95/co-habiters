const auth = require('./auth')
const hostURL = "http://localhost:3000";
const username = auth.currentUser();

async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/users/${username}/habits/entries`, options)
        // https://habit-your-way.herokuapp.com/habits 
        const data = await response.json();

        if (data.err) {
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function decrementHabit(id){
    try {
        const options = { 
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }), 
        }
        await fetch(`${hostURL}/users/${username}/habits/entries/${id}`, options);
        window.location.hash = `#profile`
    } catch (err) {
        console.warn(err);
    }
}

async function deleteUserHabit(habit_id){
    try {
        const options = { 
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }), 
        }
        await fetch(`${hostURL}/users/${username}/habits/${habit_id}`, options);
        window.location.hash = `#addhabit`
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabits, decrementHabit, deleteUserHabit }