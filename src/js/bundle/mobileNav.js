export function init() {
	'use strict';

    const mobileButton = document.querySelector('.js-nav-mobile-button');
    const mobileNav = document.querySelector('.js-nav-mobile');

    function showMobileNav(e) {

        const button = e.target;
        
        button.classList.toggle('is-close');
        mobileNav.classList.toggle('is-open');
    }
    
    mobileButton.addEventListener('click', showMobileNav);

    

}