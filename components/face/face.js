/**
 * Created by psy on 2015/12/25.
 */
var Face = function (scope, options) {
    this.$scope = $(scope);

    this.options = $.extend(true, {}, $.fn.face.options, options);

    this.$iconWrapper = this.$scope.find(this.options.iconWrapper) || $(this.options.iconWrapper);
    this.$faceWrapper = this.$scope.find(this.options.faceWrapper) || $(this.options.faceWrapper);
    this.$faceImg = this.$faceWrapper.find('img');
    this.$items = [];
    this.activeIndex = 0;

    this._create();
    this.select(this.activeIndex);
};
Face.prototype = {
    _create: function () {
        var _self = this,
            data = this.options.data,
            $icon;

        for (var i in data) {
            $icon = $('<span class="' + data[i].iconClass + '"></span>');
            $icon.on('click', (function (i) {
                return function () {
                    _self.select(i);
                }
            })(i));

            _self.$iconWrapper.append($icon);
            _self.$items.push($icon)
        }
    },
    select: function (index) {
        var _self = this;
        //�Ƴ�֮ǰѡ�е�item
        this.unSelect(this.activeIndex);

        //��������ͼ
        _self.$faceImg.attr('src', _self.options.data[index].faceSrc);
        //����icon��ѡ��״̬
        _self.$items[index].addClass('active');
        _self.activeIndex = index;
    },
    unSelect: function (index) {
        this.$items[index].removeClass('active');
    }
};

$.fn.face = function (options) {
    this.each(function (index, scope) {
        var faceObj = new Face(scope, options);
    });
};
$.fn.face.options = {
    iconWrapper: '',
    faceWrapper: '',
    autoPlay: true,
    data: []
};