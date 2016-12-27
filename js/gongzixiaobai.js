/**
 * Created by psy on 2016/1/5.
 */

var centerToBothSide = {};
//owning him page
var loverSwiper = new Swiper('#loverSwiper', {
    pagination: '#loverSwiperPagination',
    paginationClickable: true,
    direction: 'vertical',
    mousewheelControl: true,
    loop: false,
    speed: 1000,
    /* NOTE: rough fix of animated not removing and adding properly */
    onSlideChangeStart: function (swiper) {
    	 $prevSlide = $(swiper.slides[swiper.activeIndex-1]);
    	 
    	 if($prevSlide.hasClass('animated')) {
    	 	$prevSlide.removeClass('animated');
    	 } else {
    	 	$(swiper.slides[swiper.activeIndex+1]).removeClass('animated');
    	 }
    },
    onSlideChangeEnd: function (swiper) {
        var headerClass = $(swiper.slides[swiper.activeIndex]).attr('data-header-class') || '';
        if (this.headerClass != '') {
            $('.header-wrapper').removeClass(this.headerClass);
        }
        if (headerClass != '') {
            $('.header-wrapper').addClass(headerClass);
            this.headerClass = headerClass;
        }
        $(swiper.slides[swiper.activeIndex]).addClass('animated');
    },
    onInit: function (_self) {
        setTimeout(function () {
            $(_self.slides[_self.activeIndex]).addClass('animated');
        }, 1000);
    }
});
//about him page
var featureSwiper = new Swiper('#featureSwiper', {
    pagination: '#featureSwiperPagination',
    paginationClickable: true,
    direction: 'vertical',
    mousewheelControl: true,
    speed: 1800,
    loop: false,
    /* NOTE: rough fix of animated not removing and adding properly */
    onSlideChangeStart: function (swiper) {
    	 $prevSlide = $(swiper.slides[swiper.activeIndex-1]);
    	 
    	 if($prevSlide.hasClass('animated')) {
			$prevSlide.removeClass('animated');
    	 } else {
    	 	$(swiper.slides[swiper.activeIndex+1]).removeClass('animated');
    	 }
    },
    onSlideChangeEnd: function (swiper) {
        if (swiper.activeIndex == 1) {
            $(swiper.slides[swiper.activeIndex]).find('#headRotate').css('background-image', 
            "url('../../img/product/gzxb/head-rotate.gif')");
        }
        else if (swiper.activeIndex == 3) {
            var icons = $(swiper.slides[swiper.activeIndex]).find('.icon-group > .icon');
            var middleIndex = parseInt(icons.length / 2);
            var iconWidth = $(icons[0]).innerWidth();
            icons.each(function (i, iconEle) {
                var transformX = (i - middleIndex) * iconWidth;

                $(iconEle).css('transform', 'translate3d(' + transformX + 'px,0px,0px)');
            });
        }
        else if (swiper.activeIndex == 5) {
            var gifWrapper = $(swiper.slides[swiper.activeIndex]).find('#dataAnalysisGif');

            gifWrapper.css('background-image', "url('../../img/product/gzxb/data-analysis.gif')");
        }
        $(swiper.slides[swiper.activeIndex]).addClass('animated');
    },
    onInit: function (_self) {
        setTimeout(function () {
            $(_self.slides[_self.activeIndex]).addClass('animated');
        }, 1000);
    }
});
// sub-header items
var tabs = {
        headerItems: $('.sub-header').find('ul a'),
        contentItems: document.querySelector('.tab-list').querySelectorAll('.tab-item')
    },
    activeIndex = 0;

tabs.headerItems.each(function (index, ele) {
    ele.onclick = function (e) {
        $(tabs.headerItems[activeIndex]).removeClass('active');
        $(ele).addClass('active');
        if (activeIndex !== index) {
            $(tabs.contentItems[activeIndex]).removeClass('active');
            $(tabs.contentItems[index]).addClass('active');
            activeIndex = index;
        }
        switch (activeIndex) {
            case 0:
                featureSwiper.slideTo(0);
                break;
            case 1:
                loverSwiper.slideTo(0);
                break;
        }
    };
});

$('.clip-pic-list').clipBox({
    swiper: featureSwiper
});

//slide v-03 controller
$('#faceView').face({
    iconWrapper: '.icon-group',
    faceWrapper: '.face-wrapper',
    data: [{
        iconClass: 'icon icon-face-laugh',
        title: 'ϲ',
        faceSrc: '../../img/product/gzxb/face-laugh.gif'
    }, {
        iconClass: 'icon icon-face-anger',
        title: 'ŭ',
        faceSrc: '../../img/product/gzxb/face-anger.gif'
    }, {
        iconClass: 'icon icon-face-sorrow',
        title: '��',
        faceSrc: '../../img/product/gzxb/face-sorrow.gif'
    }, {
        iconClass: 'icon icon-face-happy',
        title: '��',
        faceSrc: '../../img/product/gzxb/face-happy.gif'
    }]
});

//slide v-01 'more details' controller
$('#showDesign').click(function () {
    var designSwiperWrapper = $('.design-swiper-wrapper');
    designSwiperWrapper.addClass('active');
    designSwiperWrapper.find('.icon-close').click(function (e) {
        designSwiperWrapper.removeClass('active');
    });
    setTimeout(function () {

        var designSwiper = new Swiper('#designSwiper', {
            pagination: '#designSwiperPagination',
            paginationClickable: true,
            direction: 'vertical',
            mousewheelControl: true,
            speed: 1800,
            onSlideChangeEnd: function (swiper) {
                $(swiper.slides[swiper.activeIndex]).addClass('animated');
            },
            onInit: function (_self) {
                setTimeout(function () {
                    $(_self.slides[_self.activeIndex]).addClass('animated');
                }, 1000);
            }
        });
    }, 1000);
});

//owning him slides controller
$('.lovers-swiper-container').find('.swiper-slide').each(function (index, scope) {
    var
        left = 'url("../../img/product/gzxb/lovers/v0' + parseInt(index + 1) + '-left.png")',
        right = 'url("../../img/product/gzxb/lovers/v0' + parseInt(index + 1) + '-right.png")';
    $(scope).find('.left').css('background-image', left);
    $(scope).find('.right').css('background-image', right);
});