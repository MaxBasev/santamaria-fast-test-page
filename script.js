// Утилиты
const utils = {
	// Проверка существования элемента
	exists: element => element !== null && element !== undefined,

	// Добавление множества обработчиков событий
	addEventListeners: (elements, event, handler) => {
		elements.forEach(element => element.addEventListener(event, handler));
	}
};

// Класс для управления навигацией
class Navigation {
	constructor() {
		this.nav = document.querySelector('.main-nav');
		this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
		this.navLinks = document.querySelector('.nav-links');
		this.menuLinks = document.querySelectorAll('.nav-link');

		this.init();
	}

	init() {
		if (utils.exists(this.nav)) {
			this.initStickyHeader();
		}

		if (utils.exists(this.mobileMenuBtn) && utils.exists(this.navLinks)) {
			this.initMobileMenu();
		}
	}

	initStickyHeader() {
		window.addEventListener('scroll', () => {
			this.nav.classList.toggle('scrolled', window.scrollY > 100);
		});
	}

	initMobileMenu() {
		// Обработчик кнопки мобильного меню
		this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());

		// Закрытие при клике на ссылку
		utils.addEventListeners(this.menuLinks, 'click', () => this.closeMobileMenu());

		// Закрытие при клике вне меню
		document.addEventListener('click', (e) => this.handleOutsideClick(e));
	}

	toggleMobileMenu() {
		this.navLinks.classList.toggle('active');
		this.mobileMenuBtn.classList.toggle('active');
	}

	closeMobileMenu() {
		this.navLinks.classList.remove('active');
		this.mobileMenuBtn.classList.remove('active');
	}

	handleOutsideClick(event) {
		const isClickOutside = !event.target.closest('.nav-links') &&
			!event.target.closest('.mobile-menu-btn');

		if (isClickOutside && this.navLinks.classList.contains('active')) {
			this.closeMobileMenu();
		}
	}
}

// Класс для управления корзиной
class Cart {
	constructor() {
		this.cartBtn = document.querySelector('.cart-btn');
		this.cartCount = document.querySelector('.cart-count');
		this.addToCartBtns = document.querySelectorAll('.add-to-cart');

		this.init();
	}

	init() {
		if (this.addToCartBtns.length) {
			utils.addEventListeners(this.addToCartBtns, 'click', (e) => this.handleAddToCart(e));
		}
	}

	handleAddToCart(event) {
		const button = event.currentTarget;
		const currentCount = parseInt(this.cartCount.textContent || '0');

		// Анимация добавления в корзину
		button.classList.add('adding');
		this.cartCount.textContent = currentCount + 1;

		setTimeout(() => {
			button.classList.remove('adding');
		}, 1000);
	}
}

// Класс для управления мобильной навигацией
class MobileNavigation {
	constructor() {
		this.body = document.body;
		this.nav = document.querySelector('.main-nav');
		this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
		this.navLinks = document.querySelector('.nav-links');

		this.init();
	}

	init() {
		if (this.mobileMenuBtn && this.navLinks) {
			this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
			this.handleLinkClicks();
			this.handleScroll();
		}
	}

	toggleMenu() {
		this.navLinks.classList.toggle('active');
		this.mobileMenuBtn.classList.toggle('active');
		this.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
	}

	handleLinkClicks() {
		const links = this.navLinks.querySelectorAll('a');
		links.forEach(link => {
			link.addEventListener('click', () => {
				this.closeMenu();
			});
		});
	}

	handleScroll() {
		let lastScroll = 0;

		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;

			if (currentScroll > lastScroll && currentScroll > 100) {
				this.nav.classList.add('nav-hidden');
			} else {
				this.nav.classList.remove('nav-hidden');
			}

			lastScroll = currentScroll;
		});
	}

	closeMenu() {
		this.navLinks.classList.remove('active');
		this.mobileMenuBtn.classList.remove('active');
		this.body.style.overflow = '';
	}
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
	new Navigation();
	new Cart();
	new MobileNavigation();
}); 