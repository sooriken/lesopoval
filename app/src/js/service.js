console.log("Вы попали на страницу service");
import module from './modules/popup.js';

let serviceActive = 0;
let services = document.getElementsByClassName("service-block");
let tabs = document.getElementsByClassName("service-tab");
const animationDuration = 400;

// Объект для хранения состояния кейсов каждого блока
const blockStates = {};

// Инициализация состояний для каждого блока
Array.from(services).forEach((service, index) => {
    blockStates[index] = {
        caseId: 0,
        cases: service.querySelectorAll('.service-block__wrapper'),
        arrowUp: service.querySelector('.service-block__arrow--up'),
        arrowDown: service.querySelector('.service-block__arrow--down')
    };
    
    // Изначально скрываем стрелки для неактивных блоков
    if (index !== 0) {
        blockStates[index].arrowUp.style.display = 'none';
        blockStates[index].arrowDown.style.display = 'none';
    }
});

let serviceHeight = document.querySelector('.service-block').offsetHeight;
let tabsHeight = document.querySelector('.service-tab').offsetHeight;
let contentHeight = ("-" + (serviceHeight - tabsHeight) + "px");

// Общая функция для обновления стрелок
function updateArrows(blockIndex) {
    const state = blockStates[blockIndex];
    const casesLength = state.cases.length;
    
    // Стрелка вверх
    if (state.caseId === 0) {
        state.arrowUp.style.display = 'none';
    } else {
        state.arrowUp.style.display = 'block';
    }
    
    // Стрелка вниз
    if (state.caseId >= casesLength - 1) {
        state.arrowDown.style.display = 'none';
    } else {
        state.arrowDown.style.display = 'block';
    }
}

// Функция слистывания кейсов
function setupCaseNavigation(blockIndex) {
    const state = blockStates[blockIndex];
    
    state.arrowUp.addEventListener("click", function() {
        if (state.caseId > 0) {
            state.caseId--;
            state.cases.forEach(caseBlock => {
                const newHeight = ("-" + ((serviceHeight - tabsHeight) * state.caseId) + "px");
                caseBlock.style.transform = `translateY(${newHeight})`;
            });
            updateArrows(blockIndex);
        }
    });
    
    state.arrowDown.addEventListener("click", function() {
        if (state.caseId < state.cases.length - 1) {
            state.caseId++;
            state.cases.forEach(caseBlock => {
                const newHeight = ("-" + ((serviceHeight - tabsHeight) * state.caseId) + "px");
                caseBlock.style.transform = `translateY(${newHeight})`;
            });
            updateArrows(blockIndex);
        }
    });
}

// Инициализация навигации по кейсам для всех блоков
Array.from(services).forEach((_, index) => {
    setupCaseNavigation(index);
});

// Остальной код (попапы, ресайзы и т.д.) остается без изменений
let scrollable = document.querySelector('.service-block__image-inner');
scrollable.scrollTo(0, 100);
let buttons = document.querySelectorAll('.service-block__button');
let servicePopup = document.querySelector('.service-popup');
let servicePopupBackground = document.querySelector('.service-popup__background');
let serviceNavPopup = document.querySelector('.services-nav__link');

// функция для появления попапа при нажатии на кнопку
serviceNavPopup.addEventListener("click", function () {
    servicePopup.classList.toggle("active");
    setTimeout(() => {
        servicePopup.classList.toggle("fade-in");
    }, animationDuration);
});

buttons.forEach(button => {
    button.addEventListener("click", function () {
        servicePopup.classList.toggle("active");
        setTimeout(() => {
            servicePopup.classList.toggle("fade-in");
        }, animationDuration);
    });
});

function imgWidthEqualToHeight() {
    const serviceImages = document.querySelectorAll('.service-block__image--mobile');
    serviceImages.forEach(serviceImg => {
        const height = serviceImg.offsetHeight;
        serviceImg.style.minWidth = `${height}px`;
    });
}

window.addEventListener('DOMContentLoaded', imgWidthEqualToHeight);
window.addEventListener('resize', imgWidthEqualToHeight);

servicePopupBackground.addEventListener("click", function () {
    servicePopup.classList.toggle("fade-in");
    setTimeout(() => {
        servicePopup.classList.toggle("active");
    }, animationDuration);
});

// Модифицированная функция смены блоков
function serviceSwitch(serviceID) {
    const prevState = blockStates[serviceActive];
    const newState = blockStates[serviceID];
    
    // Скрываем стрелки предыдущего блока
    prevState.arrowUp.style.display = 'none';
    prevState.arrowDown.style.display = 'none';
    
    services[serviceActive].classList.remove("active");
    services[serviceActive].classList.add("active");
    services[serviceActive].classList.remove("fade-in", "fade-out");

    if (services[serviceActive]) {
        services[serviceActive].classList.remove("active");
        services[serviceActive].classList.add("fade-out");

        setTimeout(() => {
            tabs[serviceActive].classList.toggle("service-tab--active");
            services[serviceActive].classList.remove("fade-out");
            services[serviceActive].style.display = "none";
            
            serviceActive = serviceID;
            tabs[serviceActive].classList.toggle("service-tab--active");
            
            // Показываем стрелки нового блока
            updateArrows(serviceActive);
            
            services[serviceActive].style.display = "flex";
            setTimeout(() => {
                services[serviceActive].classList.add("fade-in");
                services[serviceActive].classList.add("active");
            }, 10);
            services[serviceActive].classList.remove("fade-in");
        }, animationDuration);
    } else {
        services[serviceActive].style.display = "flex";
        services[serviceActive].classList.add("fade-in");
        services[serviceActive].classList.add("active");
    }
}

Array.from(tabs).forEach((tab, index) => {
    tab.addEventListener('click', () => {
        serviceSwitch(index);
    });
});

// Инициализация стрелок для первого блока
updateArrows(0);