/**
 *create by psy at 16/6/22
 *
 *
 * @license
 * Copyright (c) 2016 Gowild Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
'use strict';

var ImageControl = function (options) {
    this.imageDom = $(options.imageDom);
    this.thumbnailDom = $(options.thumbnailDom);
    this.underlineColor = options.underlineColor;

    this.images = options.images;
    this.render();
};

ImageControl.prototype = {
    render: function () {
        var $html = $('<div>'),
            self = this;
        for (var i in this.images) {
            var $thumbnailItem = $('<li>' +
                '<img src="' + this.images[i].thumbnailImageUrl + '">' +
                '</li>');

            //initial underline color
            $thumbnailItem.css('border-bottom-color', self.underlineColor);

            //bind click event of thumbnail-item to use closure
            (function (self, i) {
                $thumbnailItem.click(function () {
                    self.imageDom.attr('src', self.images[i].imageUrl);

                    //remove brother dom active
                    $(this).parent()
                        .find('li.active')
                        .removeClass('active');

                    $(this)
                        .addClass('active');
                });
            })(self, i);
            $html.append($thumbnailItem);
        }
        //click first child
        $html.find('li:first').click();

        this.thumbnailDom.html($html);
    },
    select: function () {

    }
};

$.fn.imageControl = function (options) {
    var imageControl = new ImageControl($.extend($.fn.imageControl.options, options));

    return imageControl;
};

$.fn.imageControl.options = {
    imageDom: '',
    thumbnailDom: '',
    images: [{
        thumbnailImageUrl: '',
        imageUrl: ''
    }],
    underlineColor: '#fff'
};