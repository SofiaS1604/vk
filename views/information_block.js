class InformationBlock extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="account_information-title">${this.getAttribute('title')}:</div>
            <div class="account_information-text">${this.getAttribute('text')}</div>`
    }
}

customElements.define('information-block', InformationBlock);