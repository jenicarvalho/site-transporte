$('.bxslider').bxSlider({
  mode: 'fade',
  captions: true
});

function scroll(){
	$('a[href*=#]').on('click', function(event){     
	    event.preventDefault();
	    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
}

scroll();