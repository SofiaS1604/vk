class groupBlock extends HTMLElement{
    constructor(){
        super();

        this.innerHTML = `<div class="group_block">
            <div class="group_block-photo" style="background-image: url(${this.getAttribute('photo')})"></div>
            <div class="group_block-text">${this.getAttribute('text')}</div>
        </div>`
    }
}

customElements.define('group-block', groupBlock);