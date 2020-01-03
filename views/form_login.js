// 08cbebcecfd5a43a133dfe026c6ecb301b8fc9f17402af9fe30b1926d7904a1a5b4556c71cd8cd4d25dc4
let active_user;
class formLogin extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="form_login-image"></div>
            <form class="form_login-block">
                <div class="form_login-title">ACCOUNT LOGIN</div>
                <input type="text" class="form_login-input" placeholder="Access token" value="08cbebcecfd5a43a133dfe026c6ecb301b8fc9f17402af9fe30b1926d7904a1a5b4556c71cd8cd4d25dc4"/>
                <button class="form_login-button">SIGN IN</button>
            </form>`;

        $('.form_login-block').addEventListener('submit', (e) => {
            //проверка на input
            $('.form_login-input').value.length !== 0 ? this.getForm() : null;
            e.preventDefault();
        })
    }

    getForm() {
        //сохраняем токен локально
        localStorage.setItem('token', $('.form_login-input').value);

        //добавляем панель
        $('.main').innerHTML = `<main-panel></main-panel>`;

        //добавим пользователя в массив и выведим о нем информацию
        if (users.length === 0) {
            getAccount().then(res => users.push(res.response[0])).then(() => {
                let account = users.find(user => user.id === active_user) ? users.find(user => user.id === active_user) : users[0];
                active_user = active_user ? active_user : account.id;
                localStorage.setItem('active_user', active_user);
                localStorage.setItem('users', JSON.stringify(users));

                $('.main').innerHTML += `
                <main-account></main-account>`
            })
        }
    }

}

customElements.define('form-login', formLogin);