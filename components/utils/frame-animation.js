/**
 * Created by psy on 2015/12/31.
 */
var FrameAnimation = function (scope, options) {
    this.options = $.extend({}, $.fn.frameAnimation, options);
    this.scope = scope;
    this.$scope = $(scope);
    this._init();
    this._compile();
};
FrameAnimation.prototype = {
    _init: function () {

    },
    _compile: function () {
        //监听touch事件
        var
            _self = this,
            touchEvent = {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            },
            gesture = {
                lastPageX: 0,
                lastPageY: 0
            };
        this.scope.addEventListener(touchEvent.start, function (e) {
            gesture.lastPageX = e.pageX;
            gesture.lastPageY = e.pageY;

            _self.scope.addEventListener(touchEvent.move, function (e) {
                if (e.pageX > gesture.lastPageX) {
                    //鼠标往右滑
                    // console.log(_self.options);
                    if (_self.options.col < _self.options.colCount) {
                        _self.options.col += 1;
                    }
                    else if (_self.options.row <= _self.options.rowCount) {
                        _self.options.col = 0;
                        _self.options.row += 1;
                    }
                    else {
                        return;
                    }
                }
                else if (e.pageX < gesture.lastPageX) {
                    //鼠标往左滑
                    if (_self.options.col < _self.options.colCount) {
                        _self.options.col -= 1;
                    }
                    else if (_self.options.row < _self.options.rowCuount) {
                        _self.options.col = _self.options.colCount;
                        _self.options.row -= 1;
                    }
                }

                gesture.lastPageX = e.pageX;
                gesture.lastPageY = e.pageY;
            });
        });
    }
};
$.fn.frameAnimation = function (options) {
    this.each(function (index, scope) {
        var frameAnimation = new FrameAnimation(scope, options);
    });
};
$.fn.frameAnimation.options = {
    /**
     * @param   colCount
     * @description     背景图片中有多少行图
     */
    //colCount: 0,
    /**
     * @param  rowCount
     * @description    背景图片中有多少列图
     */
    //rowCount: 0,
    /**
     * @param  row
     * @description  当前到第几行
     * @default      0
     */
    //row: 0,
    /**
     * @param  col
     * @description   当前到第几列
     * @default      0
     */
    //col: 0,
    /**
     * @param  width
     * @description     容器的大小
     * @default          当前图片容器的innerWidth
     */
    //width: 0,
    /**
     * @param  height
     * @description     容器的大小
     * @default          当前图片容器的innerheight
     */
    //height: 0
};