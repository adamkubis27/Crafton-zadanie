import LazyLoad from "vanilla-lazyload";
import AOS from 'aos';


import * as bannerSlider from './bundle/banner-slider';
import * as scrollDetect from './bundle/scrollDetect';
import * as validForm from './bundle/validForm';
import * as showVideo from './bundle/showVideo';
import * as mobileNav from './bundle/mobileNav';



document.onreadystatechange = () => {
  	if (document.readyState === 'complete') {  
		

		var myLazyLoad = new LazyLoad({
			elements_selector: '.lazy'
		});

		AOS.init({
			duration: 800,
		});

			
		myLazyLoad.update();
		
		bannerSlider.init();
		
		scrollDetect.init();
		
		validForm.init();
		
		showVideo.init();
		
		mobileNav.init();

		function initMap() {
			const adress = {lat: 52.407815, lng: 16.938609};
			const map = new google.maps.Map(
			document.getElementById('map'), {
			  zoom: 12,
			  center: adress,
			  disableDefaultUI: true
			});
			const marker = new google.maps.Marker({
			  position: adress,
			  map: map,
			  title: 'Here',
			  icon: {
				url: "src/img/map-marker.png"
			  }
			});
		}

		initMap()
  	}
};