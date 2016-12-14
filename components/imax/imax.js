/**
 * Created by psy on 2016/1/6.
 */
var Imax = function (scope, options) {
    this.options = $.extend(true, {}, $.fn.imax.options, options);
    this.$scope = $(scope);

    this._init();
    this._create();
};

Imax.prototype = {
    _init: function () {

    },
    _create: function () {
        var
            _self = this,
            transclude = ['<div class="modal"></div>',
                '<a class="icon icon-close"></a>'];

        _self.$scope.append(transclude);
        if (this.options.autoplay) {
            this.open();
            setTimeout(function () {
                _self.$scope.find('video').each(function () {
                    this.play();
                });
            }, 1000);
        }

        this.$closeScope = _self.$scope.find('.icon-close');

        this.$closeScope.click(function (e) {
            _self.close();
        });

        this.$scope.find('video').each(function () {
            this.src = _self.options.videoUrl;
        });
    },
    open: function () {
        $(document.body).css('overflow', 'hidden');

        this.$scope.addClass('active');
    },
    close: function () {
        this._onDestory();
        //Õ£÷π ”∆µ≤•∑≈
        this.$scope.find('video').each(function () {
            this.pause();
        });
        this.$scope.removeClass('active');
    },
    _onDestory: function () {
        $(document.body).css('overflow', 'initial');
    }
};

$.fn.imax = function (options) {
    var imax = new Imax(this, options);
};

$.fn.imax.options = {};