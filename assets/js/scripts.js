$(document).on('ready', function() { 

	initParallax();
	initEvents();
	initCollapseMenu();

	initSliders();
	/* You can disable srollanimation by removing next function */
	initScrollAnimation();

	
	/* All items in row match one height */
	$(function() { $('.matchHeight').matchHeight(); });	

	/* Lightbox plugin */
	$('.swipebox').swipebox({autoplayVideos: true});

	$('#navbar').on('click', 'a', function (event) {

        event.preventDefault();
        var href = $.attr(this, 'href').split('#');

        $('html, body').animate({
            scrollTop: $( '#' + href[1] ).offset().top - 80
        }, 500);

		return false;
	});	
});

$('#submit').on('click',function(){
	alert("thank you for your response");
});

$(window).on('scroll', function (event) {

	checkNavbar();
	checkCountUp();
}).scroll();

/* Parallax fix on window resize */ 
$(window).on('resize', function(){

 	initParallax();
});


/* Collapse menu events */
function initCollapseMenu() {

	var navbar = $('#navbar'),
		navbar_toggle = $('.navbar-toggle'),
		navbar_wrapper = $("#nav-wrapper");

    navbar.on('click', 'a', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
    });

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
    });

    navbar_wrapper.on('click', '.hasSub > a', function() {

    	var el = $(this);

    	el.next().toggleClass('show');
    	el.parent().toggleClass('show');
    	return false;
    });

    var lastWidth;
    $(window).on("resize", function () {

    	var winWidth = $(window).width();

        if (winWidth > 992 && navbar_toggle.is(':hidden')) {
            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
        }

       	lastWidth = winWidth;
    });	
}


/* Swiper slider */
function initSliders() {

    var gallerySwiper = new Swiper('#gallery-slider', {
		direction   : 'horizontal',

        slidesPerView: 4,
        slidesPerColumn: 2,

		speed		: 1000,
		nextButton	: '.arrow-right',
		prevButton	: '.arrow-left',
	
		autoplay    : 7000,
		autoplayDisableOnInteraction	: false,
    });

	$(window).on('resize', function(){

		var ww = $(window).width()
		if (ww > 1000) { gallerySwiper.params.slidesPerView = 4; }
		if (ww > 768 && ww <= 1000) { gallerySwiper.params.slidesPerView = 3; }
		if (ww > 480 && ww <= 767) { gallerySwiper.params.slidesPerView = 2; }
		if (ww <= 479) { gallerySwiper.params.slidesPerView = 1; }

		gallerySwiper.update();
	}).resize();

}


/* All keyboard and mouse events */
function initEvents() {

	/* Scrolling to navbar from "go top" button in footer */
    $('footer').on('click', '.go-top', function() {

	    $('html, body').animate({ scrollTop: 0 }, 800);
	});
}

/* Masonry initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	$('.parallax').parallax("50%", 0.1);
}


/* Scroll animation used for landing page */
function initScrollAnimation() {

	window.sr = ScrollReveal();

	var scrollZoomIn = {
		duration: 400,
		scale    : 0.1,
		mobile: false,
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	};

	var scrollGalleryIn = {
		duration: 400,
		scale    : 0.1,
		mobile: false,
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	};

	var scrollTextFade = {
		duration: 2000,
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollTextFade2 = {
		duration: 400,
		opacity: 0,
		scale: 1,
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}


	var scrollFromLeft = {
		duration: 700,
		scale: 1,
		distance: '600px',
		origin:'left',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollFromLeft2 = {
		duration: 500,
		scale: 1,
		easing: 'linear',
		distance: '600px',
		origin:'left',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	var scrollFromTop = {
		duration: 500,
		scale: 1,
		easing: 'linear',
		distance: '600px',
		origin:'top',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	var scrollFromRight = {
		duration: 700,
		scale: 1,
		distance: '600px',
		origin:'right',
		mobile: false,		
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
	}

	var scrollSliderFull = {
		duration: 1200,
		scale : 1,
		easing   : 'ease-in-out',
		distance : '0px',
		mobile: false,			
		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
	}

	/* Every element initialized once */
	if ($('#slider-full').length) {

		sr.reveal('#slider-full span, #slider-full h1', scrollTextFade);
	}

	if ($('#prizes').length) {

		sr.reveal('#prizes .item-left', scrollFromLeft);
		sr.reveal('#prizes .item-center', scrollZoomIn);
		sr.reveal('#prizes .item-right', scrollFromRight);
	}
	
	if ($('#gallery').length) {

		sr.reveal('#gallery img', scrollGalleryIn, 40);
	}	

	if ($('footer').length) {

		sr.reveal('footer li, footer .date, footer .time', scrollTextFade2, 30);
	}	
}

/* Starting countUp function on landing page */
function checkCountUp() {

	var countBlock = $('#countUp');

    if (countBlock.length) {
	
	    var scrollTop = countBlock.offset().top - window.innerHeight;

	    if (!countBlock.data('counted') && $(window).scrollTop() > scrollTop) {

	    	/* Initialized once */
	    	$(countBlock).find('.numberCount').each(function(i,el) {

				var numAnim = new CountUp($(el).attr('id'), 1, $(el).html(), 0, 2.5, {separator : ''});
				numAnim.start();
	    	});

	    	countBlock.data('counted', 1);
	    }  
	}
}

/* Navbar is set darker on main page on scroll */
function checkNavbar() {

	var scroll = $(window).scrollTop(),
    	navBar = $('nav.navbar'),
	    slideDiv = $('.slider-full');

    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}

/* Google maps init */
function initMap() {

	var mapEl = $('#map');
	var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: uluru,
	  scrollwheel: false,
	  styles: mapStyles
	});

	var marker = new google.maps.Marker({
	  position: {lat: parseFloat(mapEl.data('lat')) - 0.025, lng: parseFloat(mapEl.data('lng')) - 0.05},
	  map: map
	});
	marker.setIcon('assets/images/map-marker.png');
 }
// (function() {
//   var calculateHeight;

//   calculateHeight = function() {
//     var $content, contentHeight, finalHeight, windowHeight;
//     $content = $('#overlay-content');
//     contentHeight = parseInt($content.height()) + parseInt($content.css('margin-top')) + parseInt($content.css('margin-bottom'));
//     windowHeight = $(window).height();
//     finalHeight = windowHeight > contentHeight ? windowHeight : contentHeight;
//     return finalHeight;
//   };

//   $(document).ready(function() {
//     $(window).resize(function() {
//       if ($(window).height() < 560 && $(window).width() > 600) {
//         $('#overlay').addClass('short');
//       } else {
//         $('#overlay').removeClass('short');
//       }
//       return $('#overlay-background').height(calculateHeight());
//     });
//     $(window).trigger('resize');
    
//     // open
//     $('#popup-trigger').click(function() {
//       return $('#overlay').addClass('open').find('.signup-form input:first').select();
//     });
    
//     // close
//     return $('#overlay-background,#overlay-close').click(function() {
//       return $('#overlay').removeClass('open');
//     });
//   });

// }).call(this);

// (function() {
//   var calculateHeight;

//   calculateHeight = function() {
//     var $content, contentHeight, finalHeight, windowHeight;
//     $content = $('#overlay-content');
//     contentHeight = parseInt($content.height()) + parseInt($content.css('margin-top')) + parseInt($content.css('margin-bottom'));
//     windowHeight = $(window).height();
//     finalHeight = windowHeight > contentHeight ? windowHeight : contentHeight;
//     return finalHeight;
//   };

//   $(document).ready(function() {
//     $(window).resize(function() {
//       if ($(window).height() < 560 && $(window).width() > 600) {
//         $('#overlay').addClass('short');
//       } else {
//         $('#overlay').removeClass('short');
//       }
//       return $('#overlay-background').height(calculateHeight());
//     });
//     $(window).trigger('resize');
    
//     // open
//     $('#popup-trigger').click(function() {
//       return $('#overlay').addClass('open').find('.signup-form input:first').select();
//     });
    
//     // close
//     return $('#overlay-background,#overlay-close').click(function() {
//       return $('#overlay').removeClass('open');
//     });
//   });

// }).call(this);
// function isElementInViewport(el) {
//   var rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }
// var items = document.querySelectorAll(".timeline li");
 
// // code for the isElementInViewport function
 
// function callbackFunc() {
//   for (var i = 0; i < items.length; i++) {
//     if (isElementInViewport(items[i])) {
//       items[i].classList.add("in-view");
//     }
//   }
// }
 
// window.addEventListener("load", callbackFunc);
// window.addEventListener("scroll", callbackFunc);

// $('.popup').on('click',function(){
// 	if($('.form').css("visibility") === "visible"){
// $('.form').css("visibility","hidden");
// }
// else $('.form').css("visibility","visible");
// // alert("click");
// });
// // $('.popup').position().top = screen.height -30;
// $('.popup').css("top",screen.height-150);
// $('.form').css("top",screen.height-550);
// // console.log($('.popup').position().top-300);
// 	initParallax();
// 	initEvents();
// 	initCollapseMenu();

// 	initSliders();
// 	/* You can disable srollanimation by removing next function */
// 	initScrollAnimation();

	
// 	/* All items in row match one height */
// 	$(function() { $('.matchHeight').matchHeight(); });	

// 	/* Lightbox plugin */
// 	$('.swipebox').swipebox({autoplayVideos: true});

// 	$('#navbar').on('click', 'a', function (event) {

//         event.preventDefault();
//         var href = $.attr(this, 'href').split('#');

//         $('html, body').animate({
//             // scrollTop: $( '#' + href[1] ).offset().top - 80
//         }, 500);

// 		return false;
// 	});	
// });











// $(document).on('ready', function() { 

// 	initParallax();
// 	initEvents();
// 	initCollapseMenu();

// 	initSliders();
// 	/* You can disable srollanimation by removing next function */
// 	initScrollAnimation();

	
// 	/* All items in row match one height */
// 	$(function() { $('.matchHeight').matchHeight(); });	

// 	/* Lightbox plugin */
// 	$('.swipebox').swipebox({autoplayVideos: true});

// 	$('#navbar').on('click', 'a', function (event) {

//         event.preventDefault();
//         var href = $.attr(this, 'href').split('#');

//         $('html, body').animate({
//             // scrollTop: $( '#' + href[1] ).offset().top - 80
//         }, 500);

// 		return false;
// 	});	
// });

// //new code
$('#event_chosen').change(function(){
var id = $(this).val();

if(id === "Mait Hacks"){
	$('#team_name').css("visibility","visible");
	$('#team_name').prop('disabled',false);
	// alert("blah");
}
// else $('#team_name').prop('disabled',true);
else {
	// alert("hidden");
$('#team_name').css("visibility","hidden");
}
});



// // $('#submit').on('click',function(){
// // 	alert("thank you for your response");
// // });

// $(window).on('scroll', function (event) {

// 	checkNavbar();
// 	checkCountUp();
// }).scroll();

// /* Parallax fix on window resize */ 
// $(window).on('resize', function(){

//  	initParallax();
// });


// /* Collapse menu events */
// function initCollapseMenu() {

// 	var navbar = $('#navbar'),
// 		navbar_toggle = $('.navbar-toggle'),
// 		navbar_wrapper = $("#nav-wrapper");

//     navbar.on('click', 'a', function (e) {

//         navbar_toggle.toggleClass('collapsed');
//         navbar.toggleClass('collapse');
//     });

//     navbar_wrapper.on('click', '.navbar-toggle', function (e) {

//         navbar_toggle.toggleClass('collapsed');
//         navbar.toggleClass('collapse');
//     });

//     navbar_wrapper.on('click', '.hasSub > a', function() {

//     	var el = $(this);

//     	el.next().toggleClass('show');
//     	el.parent().toggleClass('show');
//     	return false;
//     });

//     var lastWidth;
//     $(window).on("resize", function () {

//     	var winWidth = $(window).width();

//         if (winWidth > 992 && navbar_toggle.is(':hidden')) {
//             navbar.addClass('collapse');
//             navbar_toggle.addClass('collapsed');
//         }

//        	lastWidth = winWidth;
//     });	
// }


// /* Swiper slider */
// function initSliders() {

//     var gallerySwiper = new Swiper('#gallery-slider', {
// 		direction   : 'horizontal',

//         slidesPerView: 4,
//         slidesPerColumn: 2,

// 		speed		: 1000,
// 		nextButton	: '.arrow-right',
// 		prevButton	: '.arrow-left',
	
// 		autoplay    : 7000,
// 		autoplayDisableOnInteraction	: false,
//     });

// 	$(window).on('resize', function(){

// 		var ww = $(window).width()
// 		if (ww > 1000) { gallerySwiper.params.slidesPerView = 4; }
// 		if (ww > 768 && ww <= 1000) { gallerySwiper.params.slidesPerView = 3; }
// 		if (ww > 480 && ww <= 767) { gallerySwiper.params.slidesPerView = 2; }
// 		if (ww <= 479) { gallerySwiper.params.slidesPerView = 1; }

// 		gallerySwiper.update();
// 	}).resize();

// }


// /* All keyboard and mouse events */
// function initEvents() {

// 	/* Scrolling to navbar from "go top" button in footer */
//     $('footer').on('click', '.go-top', function() {

// 	    $('html, body').animate({ scrollTop: 0 }, 800);
// 	});
// }

// /* Masonry initialization */
// function initParallax() {

// 	// Only for desktop
// 	if (/Mobi/.test(navigator.userAgent)) return false;

// 	$('.parallax').parallax("50%", 0.1);
// }


// /* Scroll animation used for landing page */
// function initScrollAnimation() {

// 	window.sr = ScrollReveal();

// 	var scrollZoomIn = {
// 		duration: 400,
// 		scale    : 0.1,
// 		mobile: false,
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
// 	};

// 	var scrollGalleryIn = {
// 		duration: 400,
// 		scale    : 0.1,
// 		mobile: false,
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
// 	};

// 	var scrollTextFade = {
// 		duration: 2000,
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
// 	}

// 	var scrollTextFade2 = {
// 		duration: 400,
// 		opacity: 0,
// 		scale: 1,
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
// 	}


// 	var scrollFromLeft = {
// 		duration: 700,
// 		scale: 1,
// 		distance: '600px',
// 		origin:'left',
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
// 	}

// 	var scrollFromLeft2 = {
// 		duration: 500,
// 		scale: 1,
// 		easing: 'linear',
// 		distance: '600px',
// 		origin:'left',
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
// 	}

// 	var scrollFromTop = {
// 		duration: 500,
// 		scale: 1,
// 		easing: 'linear',
// 		distance: '600px',
// 		origin:'top',
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
// 	}

// 	var scrollFromRight = {
// 		duration: 700,
// 		scale: 1,
// 		distance: '600px',
// 		origin:'right',
// 		mobile: false,		
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s linear'); }
// 	}

// 	var scrollSliderFull = {
// 		duration: 1200,
// 		scale : 1,
// 		easing   : 'ease-in-out',
// 		distance : '0px',
// 		mobile: false,			
// 		afterReveal: function (domEl) { $(domEl).css('transition', 'all .3s ease'); }
// 	}

// 	/* Every element initialized once */
// 	if ($('#slider-full').length) {

// 		sr.reveal('#slider-full span, #slider-full h1', scrollTextFade);
// 	}

// 	if ($('#prizes').length) {

// 		sr.reveal('#prizes .item-left', scrollFromLeft);
// 		sr.reveal('#prizes .item-center', scrollZoomIn);
// 		sr.reveal('#prizes .item-right', scrollFromRight);
// 	}
	
// 	if ($('#gallery').length) {

// 		sr.reveal('#gallery img', scrollGalleryIn, 40);
// 	}	

// 	if ($('footer').length) {

// 		sr.reveal('footer li, footer .date, footer .time', scrollTextFade2, 30);
// 	}	
// }

// /* Starting countUp function on landing page */
// function checkCountUp() {

// 	var countBlock = $('#countUp');

//     if (countBlock.length) {
	
// 	    var scrollTop = countBlock.offset().top - window.innerHeight;

// 	    if (!countBlock.data('counted') && $(window).scrollTop() > scrollTop) {

// 	    	/* Initialized once */
// 	    	$(countBlock).find('.numberCount').each(function(i,el) {

// 				var numAnim = new CountUp($(el).attr('id'), 1, $(el).html(), 0, 2.5, {separator : ''});
// 				numAnim.start();
// 	    	});

// 	    	countBlock.data('counted', 1);
// 	    }  
// 	}
// }

// /* Navbar is set darker on main page on scroll */
// function checkNavbar() {

// 	var scroll = $(window).scrollTop(),
//     	navBar = $('nav.navbar'),
// 	    slideDiv = $('.slider-full');

//     if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
// }

// /* Google maps init */
// function initMap() {

// 	var mapEl = $('#map');
// 	var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
// 	var map = new google.maps.Map(document.getElementById('map'), {
// 	  zoom: 12,
// 	  center: uluru,
// 	  scrollwheel: false,
// 	  styles: mapStyles
// 	});

// 	var marker = new google.maps.Marker({
// 	  position: {lat: parseFloat(mapEl.data('lat')) - 0.025, lng: parseFloat(mapEl.data('lng')) - 0.05},
// 	  map: map
// 	});
// 	marker.setIcon('assets/images/map-marker.png');
//  }
//  <div class="row"> 
// 				  <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Deepali Singhal </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						<!--  <div class="photo"><img id = "photo" src="assets/images/deepanshi.jpg"  alt="Icon" ></div>		 -->	
// 						 <!-- <span class="num">50 </span> -->
// 						 <span class="header">
// 							 <span>Deepanshi Bansal</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Sparsh Wadhwa </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	

// 			 </div>

// 			  <div class="row">
// 				 <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Rajat </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>
				 
// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						<!--  <div class="photo"><img src="assets/images/deepanshi.jpg" width = "150px" height = "150px" alt="Icon" ></div -->		
// 						 <span class="num">50 </span>
// 						 <span class="header">
// 							 <span>Saurabh aggarwal</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Rishabh Singh </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	

// 			 </div>

// 			  <div class="row">
// 				 <div class="col-md-4 item-left">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-1.png" alt="Icon" /></div> -->
// 						 <!-- <span class="num">15 </span> -->
// 						 <span class="header">
// 							 <span>Heena Garg </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>
				 
// 				 <div class="col-md-4 item-center">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/deepanshi.jpg" width = "150px" height = "150px" alt="Icon" ></div> -->			
// 						 <!-- <span class="num">50 </span> -->
// 						 <span class="header">
// 							 <span>Bhavya Rawat</span>
// 							<!-- for vaper winners -->
// 						 </span>
// 					 </div>
// 				 </div>

// 				 <div class="col-md-4 item-right">
// 					 <div class="item">
// 						 <!-- <div class="photo"><img src="assets/images/_icon-3.png" alt="Icon" /></div>					 -->
// 						 <!-- <span class="num">120 </span> -->
// 						 <span class="header">
// 							 <span>Vivek Aggarwal </span>
// 							<!-- for cloudchasers winners -->
// 						 </span>
// 					 </div>
// 				 </div>	
//				 </div> 
// #events {
//   background: #1b1f83;
//   /* Old browsers */
//   background: -moz-linear-gradient(left, #1b1f83 0%, #972461 100%);
//   /* FF3.6-15 */
//   background: -webkit-linear-gradient(left, #1b1f83 0%, #972461 100%);
//   /* Chrome10-25,Safari5.1-6 */
//   background: linear-gradient(to right, #1b1f83 0%, #972461 100%);
//   /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
//   filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1b1f83', endColorstr='#972461', GradientType=1);
//   /* IE6-9 */
//   /*position: relative;*/
//   padding: 90px 0 120px;
//   color: #fff;
// }
// *#events:after {
//   content: "";
//   position: absolute;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
//   background: url("../images/events-bg.png") no-repeat 10% 50%;
// }*/
// @media (max-width: 1300px) {
//   #events:after {
//     display: none;
//   }
// }
// #events h3 {
//   color: #fff;
//   margin-bottom: 32px;
// }
// #events .item {
//   width: 400px;
//   text-align: center;
//   margin-left: 150px;
//   margin-right: 40px;
//   background: rgba(255, 255, 255, 0.1);
//   border: 8px solid #AC94DD;
//   padding: 40px 0 45px;
//   position: relative;
//   z-index: 5;
//   margin-top: 40px;
// }



// #events .item.premium {
//   background: rgba(23, 28, 98, 0.5);
// }

// #events .item .header {
//   font-weight: 900;
//   font-size: 30px;
//   line-height: 1em;
//   color: #AC94DD;
// }
// #events .item .price {
//   font-weight: 900;
//   font-size: 72px;
//   line-height: 1em;
//   /*margin-bottom: 30px;*/
// }
// #events .item ul {
//   list-style: none;
//   text-align: left;
//   margin: 0 auto 20px;
//   display: inline-block;
// } 
// #events .item ul li {
//   margin: 0 0 12px -30px;
//   font-size: 18px;
// }
// #events .item ul li:before {
//   content: "\f00c";
//   display: block;
//   display: inline-block;
//   font: normal normal normal 14px/1 FontAwesome;
//   font-size: inherit;
//   text-rendering: auto;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   font-weight: 100;
//   color: #AC94DD;
//   font-size: 14px;
//   position: absolute;
//   margin: 7px 0 0 -26px;
// }
// @media (max-width: 991px) {
//   #events .item {
//     margin-bottom: 30px;
//   }
// }
// @media (max-width: 768px) {
//   #events {
//     padding: 50px 0 50px;
//   }
// }

// $('#id_email').on('click',function(){
// window.open("mailto:iosdmait@iosd.tech", '_blank');
// });

// form {
//   display: block;
// }

// label,
// input {
//   display: block;
// }

// .animate, .btn, .btn span, .overlay .overlay-content, .overlay .overlay-content .overlay-close, .overlay .overlay-content .signup-form input {
//   -webkit-transition: all 0.3s;
//   transition: all 0.3s;
// }

// main {
//   display: block;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 10;
// }

// .main-heading {
//   line-height: 100%;
//   font-weight: 600;
//   font-size: 28px;
//   color: #ffffff;
//   text-transform: uppercase;
// }

// .btn {
//   display: block;
//   height: 50px;
//   line-height: 50px;
//   border: 0;
//   text-align: center;
//   cursor: pointer;
//   border-radius: 5px;
// }
// .btn span {
//   font-weight: 600;
//   font-size: 14px;
//   text-transform: uppercase;
// }
// .btn span .fa {
//   margin-left: 8px;
//   font-size: 18px;
//   vertical-align: middle;
// }
// .btn:not(.btn-outline) {
//   background-color: #fff;
// }
// .btn:not(.btn-outline) span {
//   color: #666;
// }
// .btn:not(.btn-outline):hover {
//   background-color: #f7f7f7;
// }
// .btn.btn-outline {
//   background-color: transparent;
//   border: 1px solid #fff;
// }
// .btn.btn-outline span {
//   color: #fff;
// }
// .btn.btn-outline:hover {
//   background-color: #fff;
// }
// .btn.btn-outline:hover span {
//   color: #666;
// }

// .popup-trigger {
//   /*width: 175px;*/
//   /*margin: auto;*/
//   position: absolute;
//   /*top: 0;*/
//   /*bottom: 0;*/
//   /*left: 0;*/
//   /*right: 0;*/
//   -webkit-box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
//           box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.05);
// }

// .overlay {
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   float: left;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 5;
//   opacity: 0;
//   -webkit-transform: translateY(200px);
//           transform: translateY(200px);
//   -webkit-transition: opacity 0.5s, z-index 0s 0.5s, -webkit-transform 0.5s;
//   transition: opacity 0.5s, z-index 0s 0.5s, -webkit-transform 0.5s;
//   transition: opacity 0.5s, transform 0.5s, z-index 0s 0.5s;
//   transition: opacity 0.5s, transform 0.5s, z-index 0s 0.5s, -webkit-transform 0.5s;
// }
// .overlay .overlay-background {
//   /*background-color: rgba(0, 0, 0, 0.7);*/
//   background-color: #041A39;
//   opacity: 0.7;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 5;
// }
// .overlay .overlay-content {
//   width: 100%;
//   max-width: 530px;
//   margin: 100px auto 0;
//   padding: 0 15px;
//   color: #fff;
//   position: relative;
//   z-index: 10;
// }
// .overlay .overlay-content .overlay-close {
//   display: block;
//   font-size: 35px;
//   cursor: pointer;
//   position: absolute;
//   top: 0;
//   right: 15px;
// }
// .overlay .overlay-content .overlay-close:hover {
//   opacity: 0.8;
// }
// .overlay .overlay-content .blurb {
//   margin-top: 35px;
//   line-height: 100%;
//   font-weight: 600;
//   font-size: 18px;
// }
// .overlay .overlay-content .blurb-tagline {
//   display: block;
//   margin-top: 10px;
//   line-height: 100%;
//   font-size: 14px;
// }
// .overlay .overlay-content .signup-form {
//   margin-top: 35px;
// }
// .overlay .overlay-content .signup-form label {
//   line-height: 100%;
//   margin-bottom: 5px;
//   font-size: 14px;
// }
// .overlay .overlay-content .signup-form input {
//   background-color: transparent;
//   width: 100%;
//   height: 30px;
//   margin-bottom: 20px;
//   padding: 0 8px;
//   border: 1px solid rgba(254, 254, 254, 0.3);
//   border-radius: 5px;
// }
// .overlay .overlay-content .signup-form input:hover, .overlay .overlay-content .signup-form input:focus {
//   border-color: #fff;
// }
// .overlay .overlay-content .signup-form .submit-btn {
//   width: 150px;
// }
// .overlay.open {
//   z-index: 15;
//   opacity: 1;
//   -webkit-transform: translateY(0);
//           transform: translateY(0);
//   -webkit-transition: opacity 0.5s, z-index 0s, -webkit-transform 0.5s;
//   transition: opacity 0.5s, z-index 0s, -webkit-transform 0.5s;
//   transition: opacity 0.5s, transform 0.5s, z-index 0s;
//   transition: opacity 0.5s, transform 0.5s, z-index 0s, -webkit-transform 0.5s;
// }
// .overlay.short .overlay-content {
//   margin: 30px auto;
// }

// @media (max-width: 600px) {
//   .overlay .overlay-content {
//     margin: 25px auto;
//   }
// }

