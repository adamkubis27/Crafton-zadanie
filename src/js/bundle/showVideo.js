export function init() {
	'use strict';

    const showVideo = document.querySelector('.js-video');
    const popup = document.querySelector('.js-popup');
    const popupClose = document.querySelector('.js-close');

    function showPopup() {
        popup.classList.remove('is-hidden');
    }
    function closePopup() {
        popup.classList.add('is-hidden');
        stopVideos()
    }
    function stopVideos() {
        const videos = document.querySelectorAll('iframe, video');
        Array.prototype.forEach.call(videos, function (video) {
            if (video.tagName.toLowerCase() === 'video') {
                video.pause();
            } else {
                const src = video.src;
                video.src = src;
            }
        });
    };


    showVideo.addEventListener('click', showPopup);

    popupClose.addEventListener('click', closePopup);

}