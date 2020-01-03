class accountGroups extends HTMLElement{
    constructor(){
        super();
        this.className = 'account_groups';
        this.groups_slice = 0;
        this.innerHTML += `
                <input type="text" class="account_group-input" />
                <div class="account_group-container"></div>`;


        if(!activeUser().groups){
            this.account_groups = [];
            getGroups().then(res => {
                res.response.items.forEach(item => {
                    let group = {id:  item.id, title: item.name, photo: item.photo_200};
                    this.account_groups.push(group);
                });

                activeUser().groups = this.account_groups;
                localStorage.setItem('users', JSON.stringify(users));
                this.groups_slice = 0;
                this.getGroups();
            })
        }else{
            this.account_groups = activeUser().groups;
            this.groups_slice = 0;
            this.getGroups();
        }
    }

    getGroups(){
        if(this.account_groups.length > this.groups_slice){
            let groups = this.account_groups.slice(this.groups_slice, this.groups_slice + 3);
            this.groups_slice += 3;

            groups.forEach(group => {
                if($('.account_group-container')){
                    $('.account_group-container').innerHTML += `<group-block photo="${group.photo}" text='${group.title}'></group-block>`
                }
            });

            setTimeout(() => {
                this.getGroups();
            }, 300)
        }
    }

    searchGroups(){
        $('.account_group-input').addEventListener('input', (e) => {
            if(e.target.value.length > 0){

            }else{

            }
        })
    }


}

customElements.define('account-groups', accountGroups);