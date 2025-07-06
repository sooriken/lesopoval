console.log("Вы попали на страницу service");
import module from './modules/popup.js';

const animationDuration = 400;
const servicePopup = document.querySelector('.service-popup');
const servicePopupBackground = document.querySelector('.service-popup__background');
const serviceNavPopup = document.querySelector('.services-nav__link');

// Функция для появления попапа при нажатии на кнопку
serviceNavPopup.addEventListener("click", function() {
    servicePopup.classList.toggle("active");
    setTimeout(() => {
        servicePopup.classList.toggle("fade-in");
    }, animationDuration);
});

// Закрытие попапа при клике на фон
servicePopupBackground.addEventListener("click", function() {
    servicePopup.classList.toggle("fade-in");
    setTimeout(() => {
        servicePopup.classList.toggle("active");
    }, animationDuration);
});