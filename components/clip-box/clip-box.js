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
        //构造相关参数
        var _self = this;
        this.scrollTimestamp = 0;       //最后一次scroll的时间
        this.items = [];
        //根据父容器的大小来设置当前最大可以变换的值
        this.maxScrollValue = this.$scope.innerHeight();
        //每一次需要切换的值
        this.scrollValue = this.maxScrollValue / 6;
        this.canScrollUp = false;
        this.canScrollDown = true;

        //构造子items
        this.$scope.find('.item').each(function (index, ele) {
            _self.items.push({
                target: $(ele),
                scrollValue: 0      //transform的值，负值为向上变换、正值向下
            })
        });
        //设置子item的index
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
            //设置swiper的冻结和激活
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
     *鼠标滚轴向上滚动、即用户希望向上滚动、将页面上的图片设置向下进行变换、露出上一张图片
     * @private
     */
    _scrollUp: function () {
        //如果滑动值大于0
        if (this.getActiveItemScrollValue() >= 0) {
            this.activeIndex -= 1;
        }
        this.setActiveItemScrollValue(this.getActiveItemScrollValue() + this.scrollValue);
        this._doTransform();
    },
    /**
     * 同上
     */
    _scrollDown: function () {
        //除开最后一个元素
        if (this.activeIndex < this.items.length - 1) {
            this.setActiveItemScrollValue(this.getActiveItemScrollValue() - this.scrollValue);
            this._doTransform();

            if (this.getActiveItemScrollValue() < -this.maxScrollValue && this.activeIndex < this.items.length - 1) {
                //比负的最大值小、说明滚轴已经滑到当前图片的最底端了，这时，应该切换下一张图进行滑动
                // this.getActiveItem().target.css('z-index', 'initial');
                this.activeIndex += 1;
                //if (this.activeIndex >= this.items.length - 1) {
                //    return;
                //}
                //this.getActiveItem().target.css('z-index', '300');
                //this.items[this.activeIndex + 1].target.css('z-index', '200');
            }
        }
    },
    /**
     * 对激活的item进行transform变化
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