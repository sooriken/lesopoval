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
console.log(module);