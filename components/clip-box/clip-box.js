/**
 * Created by psy on 2015/12/24.
 */

var ClipBox = function (scope, options) {
    this.options = $.extend(true, {}, $.fn.options, options);
    this.$scope = $(scope);

    this._init();
    this._create();
};
ClipBox.prototype = {
    _init: function () {
        
        var _self = this;
        this.scrollTimestamp = 0;       
        this.items = [];

        this.maxScrollValue = this.$scope.innerHeight();
        
        this.scrollValue = this.maxScrollValue / 6;
        this.canScrollUp = false;
        this.canScrollDown = true;

        this.$scope.find('.item').each(function (index, ele) {
            _self.items.push({
                target: $(ele),
                scrollValue: 0   
            });
        });
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].target.css('z-index', (this.items.length - i) * 100);
        }
        this.activeIndex = 0;
    },
    getActiveItem: function () {
        return this.items[this.activeIndex];
    },
    getActiveItemScrollValue: function () {
        return this.items[this.activeIndex].scrollValue;
    },
    setActiveItemScrollValue: function (value) {
        return this.items[this.activeIndex].scrollValue = value;
    },
    _create: function () {
        var _self = this;
        _self.$scope.on('mousewheel', function (e) {
            if (_self.activeIndex < 0) {
                _self.activeIndex = 0;
            }
            if (typeof _self.options.swiper !== "undefined") {
                if (_self.activeIndex <= 0 && _self.items[_self.activeIndex].scrollValue >= 0) {
                    _self.options.swiper.enableMousewheelControl();
                }
                else {
                    _self.options.swiper.disableMousewheelControl();
                }
            }

            if (e.originalEvent.wheelDelta < 0) {
                _self._scrollDown();
            }
            else {
                _self._scrollUp();
            }
        });
    },
    /**
     *
     * @private
     */
    _scrollUp: function () {
        if (this.getActiveItemScrollValue() >= 0) {
            this.activeIndex -= 1;
        }
        this.setActiveItemScrollValue(this.getActiveItemScrollValue() + this.scrollValue);
        this._doTransform();
    },
    /**
     * 
     */
    _scrollDown: function () {
        
        if (this.activeIndex < this.items.length - 1) {
            this.setActiveItemScrollValue(this.getActiveItemScrollValue() - this.scrollValue);
            this._doTransform();

            if ((this.getActiveItemScrollValue() < -this.maxScrollValue) && (this.activeIndex < (this.items.length - 1))) {
//                this.getActiveItem().target.css('z-index', 'initial');
                this.activeIndex += 1;
//                if (this.activeIndex >= this.items.length - 1) {
//                    return;
//                }
//                this.getActiveItem().target.css('z-index', '300');
//                this.items[this.activeIndex + 1].target.css('z-index', '200');
            }
        }
    },
    /**
     * 
     * @private
     */
    _doTransform: function () {
        this.getActiveItem().target.css('transform', 'translate3d(0px,' + this.getActiveItem().scrollValue + 'px,0px)');
    }
}
;
$.fn.clipBox = function (options) {
    var clipBox = new ClipBox(this, options);
};
$.fn.clipBox.options = {};