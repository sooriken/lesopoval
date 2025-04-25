console.log("Вы попали на страницу service");

let serviceID = 0;
let serviceActive = 0;
let services = document.getElementsByClassName("service-block");
let servicesLength = services.length;
let tabs = document.getElementsByClassName("service-tab");
let tabsLength = tabs.length;
const animationDuration = 400;
let scrollable = document.querySelector('.service-block__image-inner'); // Получаем элементы с классом show
scrollable.scrollTo(0, 100);
let buttons = document.querySelectorAll('.service-block__button');
let servicePopup = document.querySelector('.service-popup');
let servicePopupBackground = document.querySelector('.service-popup__background');
let serviceNavPopup = document.querySelector('.services-nav__link');

let serviceBlockID = 0;
let transform = '';
let arrowUp = document.querySelector('.service-block__arrow--up');
let arrowDown = document.querySelector('.service-block__arrow--down');
let serviceCollection = document.querySelectorAll('.service-block__wrapper');
let serviceLength = serviceCollection.length;
console.log(transform);

// функция слистывания кейса вниз
arrowDown.addEventListener("click", function () {
    if(serviceBlockID < serviceLength - 1) {
        serviceBlockID = serviceBlockID + 1;
        serviceCollection.forEach(serviceBlock => {
            transform = `calc((208px - 100vh) * ${serviceBlockID})`;
            serviceBlock.style.transform = `translateY(${transform})`;
        });
        if(serviceBlockID == 1) {
            arrowUp.classList.toggle("active");
        }
        if(serviceBlockID == serviceLength - 1) {
            arrowDown.classList.toggle("active");
        }
    } 
});

// функция слистывания кейса вверх
arrowUp.addEventListener("click", function () {
    if(serviceBlockID > 0) {
        serviceBlockID = serviceBlockID - 1;
        serviceCollection.forEach(serviceBlock => {
            transform = `calc((272px - 100vh) * ${serviceBlockID})`;
            serviceBlock.style.transform = `translateY(${transform})`;
        });
        if(serviceBlockID == 0) {
            console.log(serviceLength + "foo");
            arrowUp.classList.toggle("active");
        }
        console.log(serviceBlockID);
        console.log(serviceLength + "foobar");
        if(serviceBlockID == serviceLength - 2) {
            console.log(serviceLength);
            arrowDown.classList.toggle("active");
        }
    } 
});


// функция для появления попапа при нажатии на кнопку

serviceNavPopup.addEventListener("click", function () {
    console.log("this.className"); // logs the className of my_element
    servicePopup.classList.toggle("active");
    setTimeout(() => {
        servicePopup.classList.toggle("fade-in");
    }, animationDuration);
});

// функция для появления попапа при нажатии на навигацию
buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log("this.className"); // logs the className of my_element
        servicePopup.classList.toggle("active");
        setTimeout(() => {
            servicePopup.classList.toggle("fade-in");
        }, animationDuration);
    });
});



function imgWidthEqualToHeight() {
    // Находим элемент по классу
    const serviceImages = document.querySelectorAll('.service-block__image--mobile');
  
    if (serviceImages.length > 0) {
        // Перебираем каждый элемент
        serviceImages.forEach(serviceImg => {
          // Получаем текущую высоту элемента
          const height = serviceImg.offsetHeight;

          // Устанавливаем ширину равной высоте
          serviceImg.style.minWidth = `${height}px`;
        });
    } else {
        console.warn('Элементы .service-block__image--mobile не найдены');
    }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('DOMContentLoaded', imgWidthEqualToHeight);

// Также можно вызвать функцию при изменении размера окна
window.addEventListener('resize', imgWidthEqualToHeight);

// функция скрытия попапа при нажатии на фон
servicePopupBackground.addEventListener("click", function () {
    servicePopup.classList.toggle("fade-in");
    setTimeout(() => {
        servicePopup.classList.toggle("active");
    }, animationDuration);
});

// функция смены блоков
function serviceSwitch(serviceID) {
    services[serviceActive].classList.remove("active");
    services[serviceActive].classList.add("active");

    // 2. Очищаем предыдущие анимационные классы
    services[serviceActive].classList.remove("fade-in", "fade-out");

    // 2. Запускаем анимацию исчезновения текущей панели
    if (services[serviceActive]) {
        services[serviceActive].classList.remove("active");
        services[serviceActive].classList.add("fade-out");

        // 3. После завершения анимации исчезновения
        setTimeout(() => {
            tabs[serviceActive].classList.toggle("service-tab--active");
            services[serviceActive].classList.remove("fade-out");
            services[serviceActive].style.display = "none";
            serviceActive = serviceID;
            tabs[serviceActive].classList.toggle("service-tab--active");
            // 4. Показываем и анимируем появление новой панели
            services[serviceActive].style.display = "flex";
            setTimeout(() => {
                services[serviceActive].classList.add("fade-in");
                services[serviceActive].classList.add("active");
            }, 10);
            services[serviceActive].classList.remove("fade-in");
        }, animationDuration);
    } else {
        // Если нет активной панели (первый запуск)
        services[serviceActive].style.display = "flex";
        services[serviceActive].classList.add("fade-in");
        services[serviceActive].classList.add("active");
    }
}

tabs[0].onclick = () => {
    serviceId = 0;
    serviceSwitch(serviceId);
};
tabs[1].onclick = () => {
    serviceId = 1;
    serviceSwitch(serviceId);
};
tabs[2].onclick = () => {
    serviceId = 2;
    serviceSwitch(serviceId);
};
tabs[3].onclick = () => {
    serviceId = 3;
    serviceSwitch(serviceId);
};
