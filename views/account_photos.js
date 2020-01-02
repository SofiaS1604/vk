let account_photos = []; // фотки активного пользователя
let offset_photo = 0; //с какой фотографии отправлять запрос
let count_column = Math.floor((window.innerWidth - 320) / 320); //кол-во колонок
let width_column = (window.innerWidth - 320 - count_column * 20) / count_column; //ширина колонки
let photo_slice = 0; // для вывода 5 фотографий
let photo_count = 0; // для вывода в нужный столб
let photo_index = 0; // если фотки не газрузились в массив и их нужно вывести

class accountPhotos extends HTMLElement {
    constructor() {
        super();
        this.className = 'account_photos';

        //вывод столбцов на страницу
        for (let i = 0; i < count_column; i++)
            this.innerHTML += `<div class="account_photos-column account_photos-column--${i}"></div>`;

        //если в массиве с пользователями нет фотографий и ещё не кидали запрос
        if (!activeUser().photos && offset_photo === 0) {
            this.getPhoto();
        } else {
            //если в массиве с пользователями нет фотографий
            if(!activeUser().photos){
                photo_slice = 0;
                photo_index = 1;
                this.outputPhoto();
            }else{
                account_photos = activeUser().photos;
                this.outputPhoto();
            }
        }
    }

    getPhoto() {
        //кидаем запрос
        getPhotos(offset_photo).then(photos => {
            //кол-во фотографий у пользователя
            this.count = photos.response.count;
            //добавляем в массив фотографии
            photos.response.items.forEach(photo => {
                let photo_array = {
                    id: photo.id,
                    url: photo.sizes[photo.sizes.length - 1].url
                };

                account_photos.push(photo_array);
            });

            //меняем с какой фотографии нужно выводить
            offset_photo += 5;

            //если есть фотографии, которые надо добавить в массив и массив с фотками не пустой
            if (this.count > offset_photo && account_photos) {
                //то повторяем функцию
                setTimeout(() => {
                    this.getPhoto();
                }, 300);

                //и выводим фотки на страницу
                this.outputPhoto();
            } else {
                //иначе добавим фотки пользователю в массив с пользователями
                activeUser().photos = account_photos;
                localStorage.setItem('users', JSON.stringify(users));
                //и выводим фотки
                this.outputPhoto();
            }
        })

    }

    outputPhoto() {
        //если на странице с фотками
        if ($('.account_photos')) {
            //берем 5 фотографий
            let new_photos = account_photos.slice(photo_slice, photo_slice + 5);
            //прибавляем, чтобы фотки были разные
            photo_slice += 5;
            //проходимся по массиву
            new_photos.forEach(photo => {
                //если мы на странице с фотками, выведим их в колинки
                if ($('.account_photos')) {
                    this.children[photo_count].innerHTML += `<img alt="" src="${photo.url}" class="account_photos-block" style="width: ${width_column}px">`;
                    //чтобы колонки были разные
                    photo_count !== count_column - 1 ? photo_count++ : photo_count = 0;
                }
            });

            //если есть фотки у пользователя в массиве с пользователями и не все вывели
            if ((activeUser().photos && activeUser().photos.length > photo_slice) || (photo_index === 1 && account_photos > offset_photo)) {
                //то выводим их
                setTimeout(() => {
                    this.outputPhoto();
                }, 300)
            } else if (activeUser().photos && activeUser().photos.length <= photo_slice) {
                photo_slice = 0;
                photo_count = 0;
                account_photos = [];
                offset_photo = 0;
            }
        }
    }

}

customElements.define('account-photos', accountPhotos);



