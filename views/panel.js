class Panel extends HTMLElement {
    constructor() {
        super();
        this.className = 'main_panel';
        this.innerHTML = `
            <nav class="main_panel-navigation">
                <ul>
                    <li class="panel_navigation-list panel_navigation-list--account" onclick="homePage()">Моя страница</li>
                    <li class="panel_navigation-list panel_navigation-list--news">Новости</li>
                    <li class="panel_navigation-list panel_navigation-list--messages">Сообщения</li>
                    <li class="panel_navigation-list panel_navigation-list--friends" onclick="friendsPage()">Друзья</li>
                    <li class="panel_navigation-list panel_navigation-list--communities" onclick="groupsPage()">Сообщества</li>
                    <li class="panel_navigation-list panel_navigation-list--photos" onclick="photosPage()">Фотографии</li>
                    <li class="panel_navigation-list panel_navigation-list--logout" onclick="logoutPage()">Выйти</li>
                </ul>
            </nav>`
    }
}

customElements.define('main-panel', Panel);

let homePage = () => {
    localStorage.setItem('active_user', users[0].id);
    $('.main').innerHTML = ` 
        <main-panel class="main_panel"></main-panel>
        <main-account class="main_account"></main-account>`
};

let logoutPage = () => {
    localStorage.clear();
    $('.main').innerHTML = `<form-login class="form_login"></form-login>`;
    users = [];
};

let friendsPage = () => {
    localStorage.setItem('active_user', users[0].id);
    $('.main_account').innerHTML = `<account-friends class="account-friends"></account-friends>`
};

let groupsPage = () => {
    localStorage.setItem('active_user', users[0].id);
    $('.main_account').innerHTML = `<account-groups class="account-friends"></account-groups>`
};

let photosPage = () => {
    localStorage.setItem('active_user', users[0].id);
    $('.main_account').innerHTML = `<account-photos class="account-photos"></account-photos>`
};