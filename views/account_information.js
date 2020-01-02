class accountInformation extends HTMLElement {
    constructor() {
        super();
        this.className = 'account_information';

        let date = new Date(activeUser().last_seen.time * 1000);
        let bdate = activeUser().bdate ? activeUser().bdate.split('.'): '';

        let user_information = {
            0: {
                title: 'День рождения',
                value: bdate ? `${('00'+bdate[0]).slice(-2)}.${('00'+bdate[1]).slice(-2)}${bdate[2] ? '.'+bdate[2] : ''}` : ''
            },
            1: {
                title: 'Город',
                value: activeUser().city ? activeUser().city.title : ''
            },
            2: {
                title: 'В сети',
                value: `${('00'+date.getHours()).slice(-2)}:${('00' + date.getMinutes()).slice(-2)} ${('00'+date.getDate()).slice(-2)}.${date.getMonth()}.${date.getFullYear()}`
            },
            3: {
                title: 'Интересы',
                value: activeUser().interests ? activeUser().interests : ''
            }
        };

        for (let block_title in user_information) {
            if (user_information[parseInt(block_title)].value)
                this.innerHTML += `<information-block class="account_information-block" title="${user_information[parseInt(block_title)].title}"
                                        text="${user_information[parseInt(block_title)].value}"></information-block>`;
        }
    }
}

customElements.define('account-information', accountInformation);