$( document ).ready(function() {

    $(window).on('load', function() {
       $("#cover").hide( 100 );
       video.play();
    });

	// ********* PLAY VIDEO IN CANVAS ************ //

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video = document.getElementById('video');
    var windowWidth = $('body').width(); // was window.innerWidth;

    
    //rezise to browser
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
		var windowWidth = $('body').width(); //was window.innerWidth;

        //dont go smaller than this for mobile
        if (windowWidth <= 700) { windowWidth = 900 }

        canvas.width = windowWidth;
        canvas.height = windowWidth*0.52;

        canvasVideo(); 
    }

    resizeCanvas();

     // video.autoplay = true;
     video.autoplay = false;
     video.muted = true;
	   video.load();

	video.addEventListener('ended', function () {
	    this.currentTime = 0;
	    this.play();
	 }, false);

	//draw video to canvas
    function canvasVideo() {
      var $this = video; //cache
      (function loop() {
          // ctx.drawImage($this, -2, 0, (canvas.width*1.1066), canvas.height);
          ctx.drawImage($this, -1, 0, (canvas.width*1.01), canvas.height);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
      })();
    }



    // click framestore to jump
    $('#frame-1').click( function() { 
        video.currentTime = 0;
        swapActiveFramestore()
    });
    $('#frame-2').click( function() { 
        video.currentTime = 7;
        swapActiveFramestore() 
    });

    function swapActiveFramestore() {
        if ($('#frame-1').hasClass('active')) {
            $('#frame-1').removeClass('active');
        } else {
            $('#frame-1').addClass('active');
        }
         if ($('#frame-2').hasClass('active')) {
            $('#frame-2').removeClass('active');
        } else {
            $('#frame-2').addClass('active');
        }
    }

    // ********* END PLAY VIDEO IN CANVAS ************ //









    // ********* REVEAL ELEMENTS ************ //

    var hidden1Items = [];
    var hidden2Items = [];
    var hidden3Items = [];

    var animateTime = 1000;
    var timeBetween = 250;
    var timeBetweenScrolledOnes = 150;

    $.each($('.hidden-1'), function() { hidden1Items.push(this); });
    $.each($('.hidden-2'), function() { hidden2Items.push(this); });

    // $.each($('.hidden-3'), function() { hidden3Items.push(this); });
    $.each($('.hidden-3'), function() { 
        if ( (isScrolledIntoView(this) == true ) && ($(this).hasClass('js-revealed')==false)) {
            hidden3Items.push(this);
        }
    });




    function revealItem(item) {
    	$(item).animate({
            opacity: 1
      	}, animateTime ).css({
            "-webkit-transform":"translate(0,0)",
            "-ms-transform":"translate(0,0)",
            "transform":"translate(0,0)",
            "transition": "transform 1000ms"
          })
        ;

        $(item).addClass('js-revealed');
    }



    ///THIS ISNT READING SCROLL - FIX IT
    function revealItemLoop(array, scroll, timeBreak) {
    	var i = 0;  

    	function loopReveal (array, scroll, timeBreak) {
    	   	setTimeout(function () {       	
    	       
               revealItem(array[i]);

    	       i++;                     
    	       if (i < array.length) {
    	           loopReveal(array, scroll, timeBreak);
    	       }                   
    	   }, timeBreak) 
    	}

    	loopReveal(array, scroll, timeBreak)
    }
    

    //start hidden-1 after a short delay
    setTimeout(function() { 
        revealItemLoop(hidden1Items, false, timeBetween); 
     }, 500);   

    //start hidden-2 after hidden-1 has finished
    setTimeout(function() { 
    	revealItemLoop(hidden2Items, false, timeBetween);
    }, timeBetween * (hidden1Items.length + 3) );



    // revealItemLoop(hidden3Items, true, timeBetweenScrolledOnes);  
    //test for hidden-3 + on scrolls
    $(window).scroll( function() {

        hidden3Items = [];

        $.each($('.hidden-3'), function() { 
            if ( (isScrolledIntoView(this) == true ) && ($(this).hasClass('js-revealed') == false ) ) {
                hidden3Items.push(this);
            }
        });

    	revealItemLoop(hidden3Items, true, timeBetweenScrolledOnes); 

    })


    // ********* END REVEAL ELEMENTS ************ //




    
    // ********** STICKY NAV ************ //
    var scrollPos = $(window).scrollTop();
    var menuTop;
    var topOfPage = $(window).scrollTop();

    $(window).scroll( function() {

        var scroll = $(window).scrollTop();

        //black background for primary nav
        if ($(window).scrollTop() > 0) {
            $('#nav-primary').addClass('back-black');
        } else {
            $('#nav-primary').removeClass('back-black');
        }

        //if second nav gets to primary nav, stick it
        topOfPage = $(window).scrollTop();
        
        if ( $('#second-nav-wrap').length ) {
            menuTop = $('#second-nav-wrap').offset().top;

            if ( (menuTop - topOfPage) <= 38 ) {
                $('#nav-secondary').addClass('js-second-nav-stick');
                $('#second-nav-wrap').addClass('js-nav-container-adjust');

            } else {
                $('#nav-secondary').removeClass('js-second-nav-stick');
                $('#second-nav-wrap').removeClass('js-nav-container-adjust');
            }
        }


        // make primary menu hide off screen when scrolling

        if(scroll > scrollPos) {
         // scrolling downwards
         if ( $('#nav-secondary').hasClass('js-second-nav-stick') ) {
            if ( !$('#nav-primary').hasClass('js-has-moved') ) {
              $('#nav-primary').animate({ top: '-55px' }, 300 );
              $('#nav-secondary').animate({ top: '5px' }, 300 );
              $('#nav-primary').addClass('js-has-moved');
            }
         }

        } else {
             // scrolling upwards
             if ( $('#nav-primary').hasClass('js-has-moved') ) {
                $('#nav-primary').animate({ top: '0px' }, 300 );
                $('#nav-secondary').animate({ top: '60px' }, 300 );
                $('#nav-primary').removeClass('js-has-moved');
            }
             
        }
        scrollPos = scroll;



    });



    // function moveUpMenu() {
    //   console.log('moveUP');
    //     $('#nav-primary').animate({ top: '-55px' }, 300 );
    //     $('#nav-secondary').animate({ top: '-20px' }, 300 );
    // }

    // function moveMenuDown() {
    //   console.log('moveDown');
    //   // if ( (menuTop - topOfPage) >= 45 ) {
    //     $('#nav-primary').animate({ top: '0px' }, 300 );
    //     $('#nav-secondary').animate({ top: '0px' }, 300 );
    //   // }
    // }

    // ********** END STICKY NAV ************ //






    // ********** SHOW PRODUCT NAV-1 ************ //

    $('#nav-reveal').click( function(e) {
        e.preventDefault();
        menuRevealing();
    })

    $('#mobile-menu').click ( function(e) {
        menuRevealing();
    })

    function menuRevealing() {
        var duration = 500;
        var navPrimHeight = $('#nav-primary').outerHeight();
        var navHiddenHeight = $('#nav-1-wrap').outerHeight();

        $('#nav-primary').toggleClass('js-back-black');



        // OPACITY FULL PAGE NAV
         if ( $('#nav-2-wrap').length ) {
                
            if( $('#nav-2-wrap').hasClass('js-open-marker') ) {
                //if open then close
                $('#nav-2-wrap').animate({ 
                    opacity: 0,
                    top: '0px'
                }, duration );

                setTimeout( function() {
                    $('#nav-2-wrap').removeClass('js-z550');
                }, duration )

                $('#nav-secondary').animate({ opacity: 1 }, 1000 ); 

            } else {
                //if closed, open 
                $('#nav-secondary').animate({ opacity: 0 }, 100 ); 
                $('#nav-2-wrap').addClass('js-z550');   
                $('#nav-2-wrap').animate({
                    opacity: 1,
                    top: '60px'
                }, duration );
                
                
            }

            $('#nav-2-wrap').toggleClass('js-open-marker');

        }
    }

    // ********** END SHOW PRODUCT NAV ************ //










    // ********** PARALLAX LAYERS ************ //
        $(window).scroll( function() {
            var scrollAmmount = ($(window).scrollTop() * 0.06);
      
            $('.parallax-1').css({
                "-webkit-transform":"translateY(" + scrollAmmount + "px )",
                "-ms-transform":"translateY(" + scrollAmmount + " px )",
                "transform":"translateY(" + scrollAmmount + " px )"
            })

            $('.parallax-2').css({
                "-webkit-transform":"translateY(" + scrollAmmount * 2.3 + "px )",
                "-ms-transform":"translateY(" + scrollAmmount * 2.3 + " px )",
                "transform":"translateY(" + scrollAmmount * 2.3 + " px )"
            })
        });
    // ********** END PARALLAX LAYERS ************ //




    var newUrl;

    $(".product-link").click( function() {
        if (window.location.href.indexOf('product') <= 1) {
          window.location.href = (window.location.href + 'product.html');
        }
    });

    $(".home-link").click( function() {
        window.location.href = (window.location.href.replace('/product.html', ''));
    });





   function isScrolledIntoView(elem) {
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();
	    // return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        return (elemTop <= docViewBottom - 100);

        console.log(elemTop);
	}





}); // end all