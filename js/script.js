const $ = el => document.querySelector(el);

//активнный аккаунт
let activeUser = () => users.find(user => user.id === JSON.parse(localStorage.getItem('active_user')));
let users = [];

if(localStorage.getItem('active_user')){
    $('.main').innerHTML = ` 
        <main-panel class="main_panel"></main-panel>
        <main-account class="main_account"></main-account>`;
    users = JSON.parse(localStorage.getItem('users'));
}


// запрос на получение списка друзей аккаунта
async function getFriends() {
    let request = await fetch('./php/requests.php', {
        method: 'POST', body: JSON.stringify({
            req: 'friends.get',
            data: `access_token=${localStorage.getItem('token')}&user_id=${JSON.parse(localStorage.getItem('active_user'))}&fields=photo_200_orig,status,bdate,city,last_seen,interests&v=5.103`
        })
    });

    let res = await request.json();
    return res;
}


// запрос на получение информации с аккаунта
async function getAccount() {
    let request = await fetch('./php/requests.php', {
        method: 'POST', body: JSON.stringify({
            req: 'users.get',
            data: !JSON.parse(localStorage.getItem('active_user')) ? `access_token=${localStorage.getItem('token')}&fields=status,photo_200_orig,bdate,city,last_seen,interests&v=5.8` :
                `access_token=${localStorage.getItem('token')}&user_ids=${JSON.parse(localStorage.getItem('active_user'))}&fields=status,photo_200_orig,bdate,city,last_seen,interests&v=5.8`
        })
    });

    let res = await request.json();
    return res;
}

//запрос на получение фотографий с аккаунта
async function getPhotos(offset) {
    let request = await fetch('./php/requests.php', {
        method: 'POST', body: JSON.stringify({
            req: 'photos.getAll',
            data: `access_token=${localStorage.getItem('token')}&owner_id=${JSON.parse(localStorage.getItem('active_user'))}&count=5&offset=${offset}&v=5.103`
        })
    });

    let res = await request.json();
    return res;
}

//запрос на получение групп с аккаунта
async function getGroups() {
    let request = await fetch('./php/requests.php', {
        method: 'POST', body: JSON.stringify({
            req: 'groups.get',
            data: `access_token=${localStorage.getItem('token')}&owner_id=${JSON.parse(localStorage.getItem('active_user'))}&extended=1&v=5.103`
        })
    });

    let res = await request.json();
    return res;
}