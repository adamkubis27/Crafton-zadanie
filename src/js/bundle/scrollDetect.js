export function init() {
	'use strict';

    const header = document.querySelector('.js-scroll-detect');
    
    if (header) {
        window.addEventListener('scroll', function(){
            let scrollTop = window.scrollY;
            if (scrollTop > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        })
    }

}