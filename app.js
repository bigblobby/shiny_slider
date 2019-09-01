function func(){

    // ----- Carousel settings ----- //
    var carouselWrapper = document.querySelectorAll('.carousel--wrapper');
    var dragStart;
    var dragEnd;

    var carouselSettings = {
        target: null,
        threshold: 50,
        slidesToShow: 1,
        slideWidth: function(){
            return this.target.firstElementChild.clientWidth;
        },
        init: function(){
            // Calculate left style
            if(this.slidesToShow === 1){
                this.target.style.left = -this.slideWidth() + 'px';
            }

            // Calculate width of carousel wrapper (number of slides to show)
            carouselWrapper.forEach(function(wrapper){
                wrapper.style.width = (this.slideWidth() * this.slidesToShow) + 'px';
            }, this);


            // Add event listeners
            addListeners();
        }
    };
    // ----- Carousel settings (END)----- //

    // ----- Carousel event listeners ----- //
    function addListeners(){
        carouselSettings.target.addEventListener('mousedown', function(e){
            dragStart = e.pageX;

            carouselSettings.target.addEventListener('mousemove', mouseMove);
            carouselSettings.target.addEventListener('mouseup', mouseUp);
            carouselSettings.target.addEventListener('mouseout', mouseOut);
        });
    }
    // ----- Carousel event listeners (END)----- //


    // ----- Mouse events ----- //
    function mouseOut(){
        moveSlide(0);
    }

    function mouseMove(e){
        dragEnd = e.pageX;
        carouselSettings.target.style.transform = "translateX(" + dragPos() + "px)";
    }

    function mouseUp(e){
        //Right
        if(dragPos() < -carouselSettings.threshold){
            moveSlide(-1);
        } else if(dragPos() > carouselSettings.threshold){
            moveSlide(1);
        } else {
            moveSlide(0);

        }
    }
    // ----- Mouse events (END)----- //

    function moveSlide(direction){

        // Move slide
        carouselSettings.target.style.transform = "translateX(" + (direction * carouselSettings.slideWidth()) + "px)";

        carouselSettings.target.removeEventListener('mousemove', mouseMove);
        carouselSettings.target.removeEventListener('mouseup', mouseUp);
        carouselSettings.target.removeEventListener('mouseout', mouseOut);

        carouselSettings.target.classList.add('transition');
        setTimeout(function(){
            var firstSlide = carouselSettings.target.firstElementChild;
            var lastSlide = carouselSettings.target.lastElementChild;

            if(direction === 1){
                firstSlide.insertAdjacentElement('beforebegin', lastSlide);
            } else if(direction === -1){
                lastSlide.insertAdjacentElement('afterend', firstSlide);
            }

            carouselSettings.target.style.transform = "translateX(0px)";
            carouselSettings.target.classList.remove('transition');
        }, 400)
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    // ----- Initialise carousel ----- //
    function init(settings){
        if(!settings.target){
            return console.error('Target must be passed into carousel.init()');
        }

        carouselSettings.target = document.querySelector(settings.target);
        if(settings.threshold) carouselSettings.threshold = settings.threshold;
        if(settings.slidesToShow) carouselSettings.slidesToShow = settings.slidesToShow;

        carouselSettings.init();
    }
    // ----- Initialise carousel (END)----- //

    return {
        init: init
    }
}

var carousel = func();

var carousel2 = func();

carousel.init({
    target: '.carousel',
    threshold: 100,
    slidesToShow: 1
});

carousel2.init({
    target: '.carousel-2',
    threshold: 100,
    slidesToShow: 1
});
