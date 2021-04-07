const content = require('./content')
const rHelpers = require('./renderHelpers');
const forms = require('./forms')
const auth = require('./auth');
const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = []; // add #profile and #addhabits

window.addEventListener('hashchange', updateContent);

function updateMain(path) {
    console.log("hello updating main")

    nav.innerHTML = '';
    main.innerHTML = '';
    heading.innerHTML = '';
    if (path) {
        switch (path) {
            case '#login':
                rHelpers.renderHeading()
                forms.renderLoginForm();
                forms.renderRegisterLink();
                break;
            case '#register':
                rHelpers.renderHeading()
                forms.renderRegisterForm();
                forms.renderLoginLink();
                break;
            case '#profile':
                content.renderStreaks(); content.renderMyHabits(); break;
            case '#addhabits':
                content.renderAddHabitsPage(); break;
            default:
                content.render404(); break;
        }
    } else {
        content.renderLandingPage();
    }
}

function updateContent() {
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !auth.currentUser()) {
        window.location.hash = ''
        // } else if (!privateRoutes.includes(path) && auth.currentUser()) {
        //     window.location.hash = 'profile';
    } else {
        updateMain(path);
    }
}

module.exports = { updateContent };