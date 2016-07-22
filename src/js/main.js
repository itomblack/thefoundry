$( document ).ready(function() {



	// ********* PLAY VIDEO IN CANVAS ************ //

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video = document.getElementById('video');
    var windowWidth = window.innerWidth;

    
    //rezise to browser
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
		var windowWidth = window.innerWidth;
        canvas.width = windowWidth;
        canvas.height = windowWidth*0.45;
        canvasVideo(); 
    }

    resizeCanvas();

    video.autoplay = true;
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
          ctx.drawImage($this, 0, 0, canvas.width, canvas.height);
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
    var hidden4Items = [];
    var hidden5Items = [];

    var timeBetween = 150;
    var animateTime = 1000;

    $.each($('.hidden-1'), function() { hidden1Items.push(this); });
    $.each($('.hidden-2'), function() { hidden2Items.push(this); });
    $.each($('.hidden-3'), function() { hidden3Items.push(this); });
    $.each($('.hidden-4'), function() { hidden4Items.push(this); });
    $.each($('.hidden-5'), function() { hidden5Items.push(this); });


    function revealItem(item) {
    	$(item).animate({
        opacity: 1,
      	}, animateTime );
    }



    ///THIS ISNT READING SCROLL - FIX IT
    function revealItemLoop(array, scroll) {
    	var i = 0;  

    	function loopReveal (array, scroll) {
    	   	setTimeout(function () {   
    	   		//if item on screen then show
    	   		if (scroll == true) {
    	   			if (isScrolledIntoView(array[i]) == true) {
    	   				revealItem(array[i])		
    	   			}
    	   		} else {
    	   			revealItem(array[i])		
    	   		}
    	      	
    	      
    	      i++;                     
    	      if (i < array.length) {
    	         loopReveal(array, scroll);
    	      }                   
    	   }, timeBetween) 
    	}

    	loopReveal(array, scroll)
    }
    

    //start hidden-1 after a short delay
    setTimeout(function() { 
        revealItemLoop(hidden1Items, false); 
     }, 500);   

    //start hidden-2 after hidden-1 has finished
    setTimeout(function() { 
    	revealItemLoop(hidden2Items, false);
    }, timeBetween * hidden1Items.length + 1);

    revealItemLoop(hidden3Items, true); 
    revealItemLoop(hidden4Items, true); 

    //test for hidden-3 + on scrolls
    $(window).scroll( function() {
    	revealItemLoop(hidden3Items, true); 
        revealItemLoop(hidden4Items, true);
        revealItemLoop(hidden5Items, true); 
    })
    // ********* END REVEAL ELEMENTS ************ //






    // ********** STICKY NAV ************ //
    $(window).scroll( function() {
        //black background for primary nav
        if ($(window).scrollTop() > 0) {
            $('#nav-primary').addClass('back-black');
        } else {
            $('#nav-primary').removeClass('back-black');
        }

        //if second nav gets to primary nav, stick it
        var topOfPage = $(window).scrollTop();
        var menuTop = $('#second-nav-wrap').offset().top;

        if ( (menuTop - topOfPage) <= 37 ) {
            $('#nav-secondary').addClass('js-second-nav-stick')
            $('#second-nav-wrap').addClass('js-nav-container-adjust')
        } else {
            $('#nav-secondary').removeClass('js-second-nav-stick')
            $('#second-nav-wrap').removeClass('js-nav-container-adjust')
        }
    });
    // ********** END STICKY NAV ************ //





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









   function isScrolledIntoView(elem) {
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();
	    // return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        return (elemTop <= docViewBottom);
	}





}); // end all