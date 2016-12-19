/**
 * Created by psy on 2016/1/5.
 */

var loverSwiper = new Swiper('#loverSwiper', {
    pagination: '#loverSwiperPagenation',
    paginationClickable: true,
    direction: 'vertical',
    mousewheelControl: true,
    loop: false,
    speed: 1000,
    onSlideChangeEnd: function (swiper) {
        var headerClass = $(swiper.slides[swiper.activeIndex]).attr('data-header-class') || '';
        if (this.headerClass != '') {
            $('.header-wrapper').removeClass(this.headerClass);
        }
        if (headerClass != '') {
            $('.header-wrapper').addClass(headerClass);
            this.headerClass = headerClass;
        }
    },
    onInit: function (_self) {
        setTimeout(function () {
            $(_self.slides[_self.activeIndex]).addClass('animated');
        }, 1000);
    }
});
var featureSwiper = new Swiper('#featureSwiper', {
    pagination: '#featureSwiperPagenation',
    paginationClickable: true,
    direction: 'vertical',
    mousewheelControl: true,
    speed: 1800,
    loop: false,
    onSlideChangeEnd: function (swiper) {
        if (swiper.activeIndex == 5) {
            var gifWrapper = $(swiper.slides[swiper.activeIndex]).find('#dataAnalysisGif');

            gifWrapper.css('background-image', "url('../img/data-analysis.gif')");
        }
        else if (swiper.activeIndex == 1) {
            $(swiper.slides[swiper.activeIndex]).find('#headRotate').css('background-image', "url('../img/head-rotate.gif')");
        }
    },
    onInit: function (_self) {
        setTimeout(function () {
            $(_self.slides[_self.activeIndex]).addClass('animated');
        }, 1000);
    }
});

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
        }
    }
});

/**
 * youth image
 */
var youthGwaisShow = $('#youthGwaisShow');

youthGwaisShow.find('.color-list').find('li').click(function () {
    var color = this.dataset.color,
        colorValue = this.dataset.colorValue;

    youthGwaisShow.find('.product-left').imageControl({
        imageDom: youthGwaisShow.find('.product-show').find('img'),
        thumbnailDom: youthGwaisShow.find('.product-list').find('.thumbnail-list'),
        images: (function () {
            var images = [];
            for (var i = 1; i <= 5; i++) {
                images.push({
                    imageUrl: '../../img/product/gwais/youth/' + color + '/0' + i + '.png',
                    thumbnailImageUrl: '../../img/product/gwais/youth/' + color + '/0' + i + '@min.png'
                })
            }

            return images;
        })(),
        underlineColor: colorValue
    })

    //select underline color
    $(this).parent().find('li.active').css('background-color', 'transparent').removeClass('active');
    $(this)
        .css('background-color', colorValue)
        .addClass('active');
});

//jqueryæ‚¬æµ®
var _box_y = $(".v-tab").offset().top+650;
var _box_x = $(".v-tab").offset().left;
var divcss1 = {position: 'relative',top: '0px',};
var divcss2 = {position: 'fixed',top: '50px', width:'100%'};
$(window).scroll(function(){
    if($(window).scrollTop() > _box_y){
        $(".v-tab").css(divcss2);
    }else{
        $(".v-tab").attr("style",{"position":"fixed"});
    }
});


/**
 * celebrity image
 ******************************/
var celebrityGwaisShow = $('#celebrityGwaisShow');

//render celebrity show swiper
var $celebrityShowSwiper = $('#celebrityShowSwiper');

//change the images while click the celebrity
$('#celebrityTypeList').find('li > a').click(function () {
    var selectType = this.dataset.imagePreffix,     //get select type fom DOM
        color = this.dataset.colorValue;

    changeCelebrityImage(selectType, color);

    //hao mei mei
    if (/haomeimei/.test(selectType)) {
        $('#haoMeiMeiSelector').show();
        $('#haoMeiMeiSelector').find('a[data-image-preffix="' + selectType + '"]').click();
    }
    else {
        $('#haoMeiMeiSelector').hide();
    }
    //zhi qing chun
    if (/qinchun/.test(selectType)) {
        $('#qinChunSelector').show();
        $('#qinChunSelector').find('a[data-image-preffix="' + selectType + '"]').click();
    }
    else {
        $('#qinChunSelector').hide();
    }
    //add active state
    $(this).parents('ul').find('.active').removeClass('active');
    $(this).parent('li').addClass('active');

    var selectCelebrityIndex = this.dataset.celebrityIndex;

    if (typeof selectCelebrityIndex === 'undefined') {
        $('#celebrityShowSwiper').parent('.swiper-slide').hide();
    }
    else {

        //active product show of selected celebrity
        $('#celebrityShowSwiper').parent('.swiper-slide').show();
        $celebrityShowSwiper.find('.swiper-slide.active').removeClass('active');
        $($celebrityShowSwiper.find('.swiper-slide').eq(selectCelebrityIndex)).addClass('active');

        //active buy link of selected celebrity
        $('#buyLinkContainer').find('.buy-link-item.active').removeClass('active');
        $($('#buyLinkContainer').find('.buy-link-item').eq(selectCelebrityIndex)).addClass('active');
    }
});

$('#haoMeiMeiSelector').find('a').click(function () {
    var selectType = this.dataset.imagePreffix,
        color = this.dataset.colorValue;

    changeCelebrityImage(selectType, color);

    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
});
$('#qinChunSelector').find('a').click(function () {
    var selectType = this.dataset.imagePreffix,
        color = this.dataset.colorValue;

    changeCelebrityImage(selectType, color);

    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
});
var changeCelebrityImage = function (selectType, color) {
    celebrityGwaisShow.imageControl({
        imageDom: celebrityGwaisShow.find('.show-details').find('img'),
        thumbnailDom: celebrityGwaisShow.find('.thumbnail-list'),
        images: (function () {
            var images = [];
            for (var i = 1; i <= 5; i++) {
                images.push({
                    imageUrl: '../../img/product/gwais/celebrity/' + selectType + '/0' + i + '.png',
                    thumbnailImageUrl: '../../img/product/gwais/celebrity/' + selectType + '/0' + i + '@min.png'
                })
            }
            return images;
        })(),
        underlineColor: color
    });
}

//click once to show image
youthGwaisShow.find('.color-list').find('li:first').click();
$('#celebrityTypeList').find('li > a:first').click();

//reset height of youth'banner image
var colorShowList = $('.color-show').find('.color-list > li');
colorShowList.css('height', (window.innerHeight - 200) / 3);
colorShowList.css('line-height', (window.innerHeight - 200) / 3 + 'px');