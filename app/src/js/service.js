// Service Page Controller

class ServicePage {
  constructor() {
    this.init();
  }

  init() {
    console.log('Service page initialized');
    this.cacheElements();
    this.setupEventListeners();
    this.setInitialStates();
    this.setupImageResizer();
  }

  cacheElements() {
    // Основные элементы управления
    this.serviceBlocks = document.querySelectorAll('.service-block');
    this.tabs = document.querySelectorAll('.service-tab');
    this.scrollable = document.querySelector('.service-block__image-inner');
    this.buttons = document.querySelectorAll('.service-block__button');
    this.servicePopup = document.querySelector('.service-popup');
    this.popupBackground = document.querySelector('.service-popup__background');
    this.serviceNavPopup = document.querySelector('.services-nav__link');
    
    // Навигация по кейсам
    this.arrowUp = document.querySelector('.service-block__arrow--up');
    this.arrowDown = document.querySelector('.service-block__arrow--down');
    this.serviceWrappers = document.querySelectorAll('.service-block__wrapper');
    
    // Состояние
    this.currentServiceId = 0;
    this.currentCaseId = 0;
    this.animationDuration = 400;
    this.serviceHeight = this.serviceBlocks[0]?.offsetHeight || 0;
    this.tabsHeight = this.tabs[0]?.offsetHeight || 0;
  }

  setupEventListeners() {
    // Навигация по кейсам
    this.arrowUp?.addEventListener('click', () => this.navigateCase('up'));
    this.arrowDown?.addEventListener('click', () => this.navigateCase('down'));
    
    // Переключение услуг
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.switchService(index));
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', index === 0);
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    // Попап
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.togglePopup());
    });
    
    // Попап на "связь"
    this.serviceNavPopup.addEventListener('click', () => this.togglePopup());
    
    this.popupBackground?.addEventListener('click', () => this.togglePopup());
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.servicePopup.classList.contains('active')) {
        this.togglePopup();
      }
    });
  }

  setInitialStates() {
    // Инициализация скролла
    this.scrollable?.scrollTo(0, 100);
    
    // Установка начального состояния стрелок
    this.updateArrowStates();
  }

  setupImageResizer() {
    const resizeImages = () => {
      const mobileImages = document.querySelectorAll('.service-block__image--mobile');
      
      mobileImages.forEach(img => {
        const height = img.offsetHeight;
        img.style.minWidth = `${height}px`;
      });
    };

    window.addEventListener('DOMContentLoaded', resizeImages);
    window.addEventListener('resize', resizeImages);
  }

  // Навигация по кейсам (вверх/вниз)
  navigateCase(direction) {
    if (direction === 'down' && this.currentCaseId < this.serviceWrappers.length - 1) {
      this.currentCaseId++;
    } else if (direction === 'up' && this.currentCaseId > 0) {
      this.currentCaseId--;
    } else {
      return;
    }

    this.animateCaseTransition();
    this.updateArrowStates();
    this.updateAriaLiveRegion();
  }

  animateCaseTransition() {
    const offset = `-${(this.serviceHeight - this.tabsHeight) * this.currentCaseId}px`;
    
    this.serviceWrappers.forEach(wrapper => {
      wrapper.style.transform = `translateY(${offset})`;
      wrapper.setAttribute('aria-hidden', !wrapper.classList.contains('service-block__wrapper--active'));
    });
  }

  updateArrowStates() {
    // Вверх
    if (this.currentCaseId === 0) {
      this.arrowUp.classList.remove('active');
      this.arrowUp.setAttribute('aria-disabled', 'true');
    } else {
      this.arrowUp.classList.add('active');
      this.arrowUp.setAttribute('aria-disabled', 'false');
    }

    // Вниз
    if (this.currentCaseId === this.serviceWrappers.length - 1) {
      this.arrowDown.classList.remove('active');
      this.arrowDown.setAttribute('aria-disabled', 'true');
    } else {
      this.arrowDown.classList.add('active');
      this.arrowDown.setAttribute('aria-disabled', 'false');
    }
  }

  // Переключение между услугами
  switchService(serviceId) {
    // Обновляем состояние вкладок
    this.tabs.forEach((tab, index) => {
      const isSelected = index === serviceId;
      tab.classList.toggle('service-tab--active', isSelected);
      tab.setAttribute('aria-selected', isSelected);
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Анимация перехода
    this.animateServiceTransition(serviceId);
  }

  animateServiceTransition(newServiceId) {
    const currentService = this.serviceBlocks[this.currentServiceId];
    const newService = this.serviceBlocks[newServiceId];

    if (currentService) {
      currentService.classList.remove('active');
      currentService.classList.add('fade-out');
      
      setTimeout(() => {
        currentService.style.display = 'none';
        currentService.classList.remove('fade-out');
        
        this.currentServiceId = newServiceId;
        this.showNewService(newService);
      }, this.animationDuration);
    } else {
      this.showNewService(newService);
    }
  }

  showNewService(service) {
    service.style.display = 'flex';
    
    setTimeout(() => {
      service.classList.add('fade-in');
      service.classList.add('active');
      service.focus();
    }, 10);
  }

  // Управление попапом
  togglePopup() {
    const isOpening = !this.servicePopup.classList.contains('active');
    
    this.servicePopup.classList.toggle('active');
    
    if (isOpening) {
      setTimeout(() => {
        this.servicePopup.classList.add('fade-in');
        this.servicePopup.setAttribute('aria-hidden', 'false');
      }, this.animationDuration);
    } else {
      this.servicePopup.classList.remove('fade-in');
      setTimeout(() => {
        this.servicePopup.setAttribute('aria-hidden', 'true');
      }, this.animationDuration);
    }
    
    // Управление focus при открытии/закрытии
    if (isOpening) {
      document.body.style.overflow = 'hidden';
      this.servicePopup.querySelector('button, [href], input, select, textarea').focus();
    } else {
      document.body.style.overflow = '';
    }
  }

  // Обновление ARIA live region для скринридеров
  updateAriaLiveRegion() {
    const liveRegion = document.getElementById('aria-live-region') || this.createLiveRegion();
    const currentCase = this.serviceWrappers[this.currentCaseId];
    const caseTitle = currentCase.querySelector('.service-block__name')?.textContent || '';
    
    liveRegion.textContent = `Текущий кейс: ${caseTitle}`;
  }

  createLiveRegion() {
    const region = document.createElement('div');
    region.id = 'aria-live-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.position = 'absolute';
    region.style.left = '-9999px';
    document.body.appendChild(region);
    return region;
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new ServicePage();
});