var carousel = (function(){

    function Carousel(settings){
        this.target = document.querySelector(settings.target);
        this.threshold = settings.threshold;
        this.slidesToShow = settings.slidesToShow;
        this.slideWidth = function(){
            return this.target.firstElementChild.clientWidth;
        };
        this.init = function(){
            // Calculate left style
            if(this.slidesToShow === 1){
                this.target.style.left = -this.slideWidth() + 'px';
            }

            // Calculate width of carousel wrapper (number of slides to show)
            carouselWrapper.style.width = (this.slideWidth() * this.slidesToShow) + 'px';

            // Add event listeners
            this.addListeners();
        };
        this.boundOut = mouseOut.bind(this);
        this.boundMove = mouseMove.bind(this);
        this.boundUp = mouseUp.bind(this);
    }

    // ----- Carousel settings ----- //
    var carouselWrapper = document.querySelector('.carousel--wrapper');
    var dragStart;
    var dragEnd;

    // var carouselSettings = {
    //     target: null,
    //     threshold: 50,
    //     slidesToShow: 1,
    //
    // };
    // ----- Carousel settings (END)----- //

    // ----- Carousel event listeners ----- //
    Carousel.prototype.addListeners = function(){
        var self = this;

        console.log(self);

        this.target.addEventListener('mousedown', function(e){
            dragStart = e.pageX;

            self.target.addEventListener('mousemove', self.boundMove);
            self.target.addEventListener('mouseup', self.boundUp);
            self.target.addEventListener('mouseout', self.boundOut);
        });
    };
    // ----- Carousel event listeners (END)----- //


    // ----- Mouse events ----- //
    function mouseOut(){
        this.moveSlide(0);
    }

    function mouseMove(e){
        dragEnd = e.pageX;
        this.target.style.transform = "translateX(" + dragPos() + "px)";
    }

    function mouseUp(e){
        //Right
        if(dragPos() < -this.threshold){
            this.moveSlide(-1);
        } else if(dragPos() > this.threshold){
            this.moveSlide(1);
        } else {
            this.moveSlide(0);
        }
    }

    Carousel.prototype.moveSlide = function(direction){

        var self = this;

        console.log(self);

        // Move slide
        this.target.style.transform = "translateX(" + (direction * this.slideWidth()) + "px)";

        this.target.removeEventListener('mousemove', self.boundMove);
        this.target.removeEventListener('mouseup', self.boundUp);
        this.target.removeEventListener('mouseout', self.boundOut);

        this.target.classList.add('transition');
        setTimeout(function(){
            var firstSlide = self.target.firstElementChild;
            var lastSlide = self.target.lastElementChild;

            if(direction === 1){
                firstSlide.insertAdjacentElement('beforebegin', lastSlide);
            } else if(direction === -1){
                lastSlide.insertAdjacentElement('afterend', firstSlide);
            }

            self.target.style.transform = "translateX(0px)";
            self.target.classList.remove('transition');
        }, 400)
    };
    // ----- Mouse events (END)----- //



    function dragPos() {
        return dragEnd - dragStart;
    }

    // ----- Initialise carousel ----- //
    function init(settings){
        if(!settings.target){
            return console.error('Target must be passed into carousel.init()');
        }

        var car = new Carousel(settings);

        car.init();
    }
    // ----- Initialise carousel (END)----- //

    return {
        init: init
    }
})();

carousel.init({
    target: '.carousel',
    threshold: 100,
    slidesToShow: 1
});

// carousel.init({
//     target: '.carousel-2',
//     threshold: 100,
//     slidesToShow: 2
// });
