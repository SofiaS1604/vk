class Account extends HTMLElement {
    constructor() {
        super();
        this.className = 'main_account';
        this.innerHTML = `
            <div class="main_account-about">
                <div class="account_about-container">
                    <div class="account_about-photo" style="background-image: url(${activeUser().photo_200_orig})"></div>
                    <div class="account_about-info">
                        <div class="account_about-user">${activeUser().first_name} ${activeUser().last_name}</div>
                        <div class="account_about-text">${activeUser().status}</div>
                        <account-menu></account-menu>
                    </div>
                </div>
            </div>
            <div class="main_account-container">
                <account-information></account-information>
            </div>`
    }

}

customElements.define('main-account', Account);