$(function() {

	$('.glam-marker_button').on('click', function(){
		$('.glam-marker').removeClass('active');
		$(this).closest('.glam-marker').addClass('active');
	});

	$('.glam-marker_popup-close').on('click', function(){
		$(this).closest('.glam-marker').removeClass('active');
	});

	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".glam-marker"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.removeClass('active');
		}
	});

	$('.accuracy-video_play').on('click', function(){
		$(this).closest('.accuracy-video').addClass('active').find('iframe').attr('src', $(this).closest('.accuracy-video').find('iframe').attr('data-src'));
		$(this).closest('.accuracy-video').find('video')[0].play();
	});

	$('.video_play, .serum-video_play').on('click', function(){
		$(this).closest('.video, .serum-video').addClass('active').find('iframe').attr('src', $(this).closest('.video, .serum-video').find('iframe').attr('data-src'));
		$(this).closest('.video, .serum-video').find('video')[0].play();
	});

	Number.prototype.pad = function(size) {
		var s = String(this);
		while (s.length < (size || 2)) {s = "0" + s;}
		return s;
	}

	$('.alignment-slider, .pomade-slider').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		var i = (currentSlide ? currentSlide : 0) + 1;
		$(this).closest('.alignment-content, .pomade-content').find('.slider-count').html(i.pad() + '/' + slick.slideCount.pad());
	});
			 
	$('.alignment-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			  }
			},
		]
	});
			 
	$('.pomade-slider').slick({
		infinite: true,
		slidesToShow: 10,
		slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 1500,
			  settings: {
				slidesToShow: 7,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			  }
			},
		]
	});
 
	$(window).on('load resize', function() {
		if ($(window).width() < 1200) {
		  $('.gloss-slider:not(.slick-initialized)').slick({
			infinite: true,
			slidesToShow: 10,
			slidesToScroll: 1,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				  }
				}
			]
		  });
		} else {
		  $(".gloss-slider.slick-initialized").slick("unslick");
		}
		$('.pomade-slider').find('.alignment-slider_title').height('auto');
		$('.pomade-slider').each(function(){
			var max = 0;
			$(this).find('.alignment-slider_title').each(function(){
				if ($(this).height()>max) 
					max = $(this).height();
			})
			$(this).find('.alignment-slider_title').height(max);
		});
	});


	$(document).on('scroll', function() {
		var bottom = $(document).scrollTop() + ($(window).height()); 
	
		$('.serum-video, .video').each(function(){
			if ((bottom > $(this).offset().top) && (!$(this).hasClass('active'))){
				if ($(this).find('video').length){
					$(this).addClass('active').find('video')[0].play();
				}
			}
		});
		scrollAnimation();
		
	})

	function scrollAnimation(){
		var bottomScroll = $(window).scrollTop() + ($(window).height()*0.90);
		var topScroll = $(window).scrollTop();
		$('.animation').each(function(){
			if (bottomScroll >= $(this).offset().top ) {
				$(this).addClass('animation--active');
			}else{
				// $(this).removeClass('animation--active');
			}
			// if ( (topScroll >= ( $(this).offset().top + $(this).innerHeight() ) ) || ($(window).scrollTop() + $(window).height() <= $(this).offset().top) ){
			// 	$(this).removeClass('animation--active');
			// }
		});
	}
	scrollAnimation();

});
