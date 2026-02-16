import module from './modules/module.js';

const smoothLinks = document.querySelectorAll("a[href^='#']");
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute("href");

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

// мобильное меню
document.addEventListener('DOMContentLoaded', function() {
        const menuButton = document.querySelector('.mobile-menu');
        const menuLinks = document.querySelector('.welcome__nav-links');
        
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            menuLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.welcome__nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menuButton.classList.remove('active');
                menuLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    });

//слайдер галереи
class GallerySlider {
    constructor() {
        this.sliderInner = document.querySelector('.gallery__slider-inner');
        this.itemInner = document.querySelector('.gallery__item-inner');
        this.items = document.querySelectorAll('.gallery__item');
        this.prevBtn = document.querySelector('.gallery__arrow--left');
        this.nextBtn = document.querySelector('.gallery__arrow--right');
        
        this.currentIndex = 0;
        this.itemWidth = 0;
        this.totalItems = this.items.length;
        
        this.init();
    }
    
    init() {
        // Получаем ширину одного элемента
        this.updateItemWidth();
        
        // Вешаем обработчики на кнопки
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Обновляем при ресайзе
        window.addEventListener('resize', () => this.updateItemWidth());
    }
    
    updateItemWidth() {
        // Ширина видимой области слайдера
        this.itemWidth = this.sliderInner.offsetWidth;
        
        // Устанавливаем ширину для каждого элемента
        this.items.forEach(item => {
            item.style.width = this.itemWidth + 'px';
        });
        
        // Обновляем позицию слайдера
        this.updateSliderPosition();
    }
    
    updateSliderPosition() {
        const translateX = -this.currentIndex * this.itemWidth;
        this.itemInner.style.transform = `translateX(${translateX}px)`;
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateSliderPosition();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateSliderPosition();
    }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new GallerySlider();
});

// подсказка tooltip
class MultiTooltip {
    constructor() {
        this.tooltip = null;
        this.currentElement = null;
        this.createTooltip();
        this.init();
    }
    
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        document.body.appendChild(this.tooltip);
    }
    
    init() {
        // Единый обработчик для всего документа
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            const tooltipText = target.closest('[data-tooltip]')?.dataset.tooltip;
            
            if (tooltipText && target.closest('[data-tooltip]')) {
                this.currentElement = target.closest('[data-tooltip]');
                this.showTooltip(e, tooltipText);
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.currentElement) {
                this.moveTooltip(e);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (this.currentElement && !e.relatedTarget?.closest('[data-tooltip]')) {
                this.hideTooltip();
                this.currentElement = null;
            }
        });
    }
    
    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.display = 'block';
        setTimeout(() => {
            this.tooltip.classList.add('active');
        }, 10);
        this.moveTooltip(event);
    }
    
    moveTooltip(event) {
        const offsetX = 15;
        const offsetY = 15;
        
        // Предотвращаем выход за границы экрана
        const maxX = window.innerWidth - this.tooltip.offsetWidth - 5;
        const maxY = window.innerHeight - this.tooltip.offsetHeight - 5;
        
        const posX = Math.min(event.clientX + offsetX, maxX);
        const posY = Math.min(event.clientY + offsetY, maxY);
        
        this.tooltip.style.left = Math.max(5, posX) + 'px';
        this.tooltip.style.top = Math.max(5, posY) + 'px';
    }
    
    hideTooltip() {
        this.tooltip.classList.remove('active');
        setTimeout(() => {
            if (!this.currentElement) {
                this.tooltip.style.display = 'none';
            }
        }, 200);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new MultiTooltip();
});

console.log(module);