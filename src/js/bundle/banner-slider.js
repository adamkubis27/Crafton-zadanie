export function init() {
	'use strict';

	const slider = document.querySelector('.js-banner-slider');

    if (slider) {
        
        const slides = document.querySelector('.js-banner-slider-items').children;
        const sliderPrev = document.querySelector('.js-banner-slider-prev');
        const sliderNext = document.querySelector('.js-banner-slider-next');
        const totalSlides = slides.length;
        let index = 0;

        sliderNext.onclick = function() {
            sliderAction('next');
        }

        sliderPrev.onclick = function() {
            sliderAction('prev');
        }

        
        function sliderAction(direction) {
            if (direction == 'next') {
                index++;
                paggination.forEach(el => el.classList.remove('is-active'));
                if (index == totalSlides) {
                    index=0
                }

                paggination[index].classList.add('is-active');
            } else {
                paggination.forEach(el => el.classList.remove('is-active'));
                if (index == 0) {
                    index =totalSlides-1;
                } else {
                    index--;
                }
                paggination[index].classList.add('is-active');
                
            }
        
            for (let i = 0; i < totalSlides; i++) {
                slides[i].classList.remove('is-active');
            }

            slides[index].classList.add('is-active');
        }

        const paggHolder = document.querySelector('.js-banner-slider-pagg');

        for (let i = 0; i < totalSlides; i++) {
            let el = document.createElement('div');
            el.classList = 'banner-slider-pagg__item js-banner-slider-pagg-item';
            el.setAttribute('data-id', i);
            paggHolder.appendChild(el);
        }

        
        let paggination = document.querySelectorAll('.js-banner-slider-pagg-item');
        
        const selectMe = function(e) {
            const paggEl = e.target;
            index = paggEl.getAttribute('data-id');
            
            document.querySelectorAll('.js-banner-slider-pagg-item').forEach( el => el.classList.remove('is-active'));
            paggEl.classList.add('is-active');

            for (let i = 0; i < totalSlides; i++) {
                slides[i].classList.remove('is-active');
            }
            slides[index].classList.add('is-active');

        }
        if(paggination.length) {
            paggination.forEach( el => el.addEventListener('click', selectMe));
        }

    }

}