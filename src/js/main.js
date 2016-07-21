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
        canvas.height = windowWidth*0.41;
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
          ctx.drawImage($this, 0, 0);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
      })();
    }

    // ********* END PLAY VIDEO IN CANVAS ************ //









    // ********* REVEAL ELEMENTS ************ //

    var hidden1Items = [];
    var hidden2Items = [];
    var hidden3Items = [];

    var timeBetween = 250;
    var animateTime = 1000;

    $.each($('.hidden-1'), function() { hidden1Items.push(this); });
    $.each($('.hidden-2'), function() { hidden2Items.push(this); });
    $.each($('.hidden-3'), function() { hidden3Items.push(this); });


    function revealItem(item) {
    	$(item).animate({
        opacity: 1,
      	}, animateTime );
    }

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
    	         loopReveal(array);
    	      }                   
    	   }, timeBetween) 
    	}
    	loopReveal(array)
    }
    

    revealItemLoop(hidden1Items, false); 
  

    setTimeout(function() { 
    	revealItemLoop(hidden2Items, false);
    }, timeBetween * hidden1Items.length + 1);


    $(window).scroll( function() {
    	revealItemLoop(hidden3Items, true); 
    })
   

    // ********* END REVEAL ELEMENTS ************ //






   function isScrolledIntoView(elem) {
	    var docViewTop = $(window).scrollTop();
	    var docViewBottom = docViewTop + $(window).height();

	    var elemTop = $(elem).offset().top;
	    var elemBottom = elemTop + $(elem).height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}





}); // end all