class accountMenu extends HTMLElement {
    constructor() {
        super();
        this.className = 'account_about-menu';
        this.innerHTML = `<nav class="account_menu-navigation">
                                <ul>
                                    <li class="account_menu-list account_menu-list--information account_menu-list--active" onclick="clickMenu('information')">Информация</li>
                                    <li class="account_menu-list account_menu-list--friends" onclick="clickMenu('friends')">Друзья</li>
                                    <li class="account_menu-list account_menu-list--photos" onclick="clickMenu('photos')">Фотографии</li>
                                    <li class="account_menu-list account_menu-list--groups" onclick="clickMenu('groups')">Сообщества</li>
                                </ul>
                            </nav>`
    }
}

customElements.define('account-menu', accountMenu);


let clickMenu = (type) => {
    $('.account_menu-list--active').classList.remove('account_menu-list--active');
    $(`.account_menu-list--${type}`).classList.add('account_menu-list--active');

    $('.main_account-container').innerHTML = `<account-${type}></account-${type}>`;
};