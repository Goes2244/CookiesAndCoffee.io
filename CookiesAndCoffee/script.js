document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.mobile-nav a');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
    
    // Функция для плавной прокрутки
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Функция для переключения меню
    function toggleMenu() {
        burgerIcon.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        if (mobileNav.classList.contains('active')) {
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollPosition}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    }

    // Обработчик клика по иконке бургера
    burgerIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !burgerIcon.contains(e.target)) {
            toggleMenu();
        }
    });

    // Обработчики для ссылок в мобильном меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
            
            smoothScroll(target);
        });
    });

    // Обработчики для ссылок в десктопном меню
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Закрытие меню при изменении размера окна (если перешли на десктопную версию)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fallback для браузеров без поддержки smooth scroll
    if (!('scrollBehavior' in document.documentElement.style)) {
        const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
        
        allAnchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                smoothScroll(target);
            });
        });
    }
});