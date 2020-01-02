let type_page = 'all'; //тип страницы

class accountFriends extends HTMLElement {
    constructor() {
        super();
        this.account_friends = []; //друзья с аккауна
        this.index_friends = 0; //индекс друга для загрузки друзей
        this.className = 'account_friends';

        // кнопка все друзья и друзья онлайн
        this.innerHTML = `<div class="account_friends-buttons">
                <div class="account_friends-button account_friends-button--all account_friends-button--active" onclick="new accountFriends().friendsMenu('all')">Все друзья</div>
                <div class="account_friends-button account_friends-button--online" onclick="new accountFriends().friendsMenu('online')">Друзья онлайн</div>
            </div>
            <input type="text" class="account_friends-input"/>`;

        this.innerHTML += `<div class="account_friends-container"></div>`;
        this.searchFriends();

        if ($('.account_friends-container'))
            $('.account_friends-container').innerHTML = '';


        //проверка существуют в массиве с пользователями его друзья
        if (!activeUser().friends) {
            //если нет, то обращаемся к api, добавляем друзей в массив со всеми пользователями
            getFriends().then(friends => {
                friends.response.items.forEach(friend => {
                    this.account_friends.push(friend);
                    //проверка на существование уже такого пользователя
                    if (!users.find(user => user.id === friends.id))
                        users.push(friend)
                });
            }).then(() => {
                //и добавляем в друзья к этому аккаунту
                activeUser().friends = this.account_friends;
                localStorage.setItem('users', JSON.stringify(users))

                //запускаем функцию вывода
                this.getFriends();
            });
        } else {
            //если всё есть, то записываем в переменную и всё выводим
            this.account_friends = activeUser().friends;
            this.getFriends();
        }
    }

    //функция вывода всех друзей
    getFriends() {
        //если количество друзей меньше счетчика для среза
        if (this.account_friends.length >= this.index_friends) {
            //то создаем массив из 5 друзей
            let friends = this.account_friends.slice(this.index_friends, this.index_friends + 5);
            //прибавляем к счетчику (чтобы массив из 5 друзей был разный)
            this.index_friends += 5;
            //выводим массив из 5 друзей
            friends.forEach(friend => {
                if ($('.account_friends-container')) {
                    $('.account_friends-container').innerHTML += `<friend-block 
                                                            id="${friend.id}"
                                                            photo="${friend.photo_200_orig}"
                                                            first_name="${friend.first_name}"
                                                            last_name="${friend.last_name}"
                                                            online="${friend.online}">
                                                       </friend-block>`
                }
            });


            //выводим каждый массив из 5 пользователей через 1 секунду
            setTimeout(() => {
                this.getFriends();
            }, 300);
        }
    }

    //переключаем меню при нажатии кнопок
    friendsMenu(type) {
        //убираем класс у прошлой активной кнопки
        $('.account_friends-button--active').classList.remove('account_friends-button--active');
        //добавляем класс кнопке, которую нажали
        $(`.account_friends-button--${type}`).classList.add('account_friends-button--active');
        //очищаем контайнер с друзьями
        $('.account_friends-container').innerHTML = '';
        this.account_friends;

        if (type === 'all') {
            this.account_friends = activeUser().friends
        } else {
            this.account_friends = activeUser().friends.filter(user => user.online === 1);
        }
        this.index_friends = 0; //обнуляем счетчик друзей
        this.getFriends()
    }

    searchFriends() {
        if ($('.account_friends-input')) {
            $('.account_friends-input').addEventListener('input', (e) => {
                if (e.target.value.length > 0) {
                    let search = e.target.value.split(' ');
                    if (search.length === 1) {
                        this.account_friends = activeUser().friends.filter(el =>
                            (el.first_name.search(search[0]) > -1 || el.last_name.search(search[0]) > -1))
                    } else if (search.length === 2) {
                        this.account_friends = activeUser().friends.filter(el =>
                            (el.first_name.search(search[0]) > -1 && el.last_name.search(search[1]) > -1
                                || el.last_name.search(search[0]) > -1 && el.first_name.search(search[1]) > -1))
                    }

                    $('.account_friends-container').innerHTML = ' ';
                    this.getFriends();
                } else {
                    this.account_friends = activeUser().friends
                }
            })
        }
    }
}

customElements.define('account-friends', accountFriends);
