/**
 * Created by psy on 2015/12/10.ddd
 */
var onImgError = function (e) {
    this.options = {};
};

var Common = function () {
    this._init();
};
Common.prototype = {
    _init: function () {
        var _self = this;

        this._initHeader();
    },
    _initHeader: function () {
        var
            _self = this,
            $header = $('.header-wrapper'),
            $subHeader = $header.find('.sub-header');
        document.body.addEventListener('mousewheel', function (e) {
            if (e.wheelDelta > 0) {
                if (_self.canScroll(_self.lastTopScrollTimeStamp, e.timeStamp)) {
                    //���Ϲ���
                    $header.addClass('active');
                    setTimeout(function () {
                        $header.removeClass('active');
                    }, 1500);

                    _self.lastTopScrollTimeStamp = e.timeStamp;
                }
            }
            else {
                if (_self.canScroll(_self.lastDownScrollTimeStamp, e.timeStamp)) {
                    $header.removeClass('active');

                    _self.lastDownScrollTimeStamp = e.timeStamp;
                }
            }
        });

        //nav links active state
        var
            href = window.location.href,
            navs = $header.find('nav').find('a');
        navs.each(function (index, navEle) {
            if (href == navEle.href) {
                $(navEle).addClass('active');
            }
        });
    },
    canScroll: function (lastTimeStamp, currentTimeStamp) {
        return typeof lastTimeStamp === "undefined" ? true : currentTimeStamp - lastTimeStamp >= 1000;
    },
    showLoading: function (type) {

    },
    hideLoading: function () {

    }
};

var common = new Common();
var qqContact = function () {
    window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4008239139&f=1&ty=1', '_blank');
};