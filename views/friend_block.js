class friendBlock extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="friend_block" onclick="viewProfile(${this.getAttribute('id')})">
                <div class="friend_block-photo" style="background-image: url(${this.getAttribute('photo')})"></div>
                <div class="friend_block-container">
                    <div class="friend_block-user">${this.getAttribute('first_name')} ${this.getAttribute('last_name')}</div>
                    <div class="friend_block-online">${this.getAttribute('online') === '1' ? 'В сети' : ''}</div>
                </div>
            </div>`
    }
}

let viewProfile = (id) => {
    localStorage.setItem('active_user', id);

    $('.main').innerHTML = ` 
        <main-panel class="main_panel"></main-panel>
        <main-account class="main_account"></main-account>`
};


customElements.define('friend-block', friendBlock);