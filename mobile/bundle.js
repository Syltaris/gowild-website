//register required module

angular.module('utils', []);
angular.module('services', []);

angular.module('starter', ['ui.router', 'ionic', 'utils', 'services', 'starter.components', 'starter.controllers'])
  .run(['$rootScope', '$state', '$location', function ($rootScope, $state, $location) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      //bind $state to root scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = toParams;
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('center');
    //use browser scroll
    $ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider
      .state('dash', {
        url: '/dash',
        templateUrl: 'views/dash/dash.html',
        controller: 'DashCtrl',
        cache: false
      })
      .state('xb', {
        url: '/xb',
        templateUrl: 'views/product/xb/xb.html',
        controller: 'XbCtrl',
        cache: false
      })
      .state('xxb', {
        url: '/xxb',
        templateUrl: 'views/product/xxb/xxb.html',
        controller: 'XxbCtrl',
        cache: false
      })
      .state('star', {
        url: '/star',
        templateUrl: 'views/product/star/star.html',
        controller: 'StarCtrl',
        cache: false
      })
      .state('news', {
        url: '/news',
        templateUrl: 'views/news/news.html',
        controller: 'NewsCtrl',
        cache: false
      })
      .state('news.list', {
        url: '/list',
        templateUrl: 'views/news/list/list.html',
        controller: 'NewsListCtrl',
        cache: false,
      })
      .state('news.details', {
        url: '/details/:cid/:id',
        templateUrl: 'views/news/news-detail/news-detail.html',
        controller: 'NewsDetailCtrl',
        cache: false
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl',
        cache: false
      })
      .state('purchase', {
        url: '/purchase',
        templateUrl: 'views/purchase/purchase.html',
        controller: 'PurchaseCtrl',
        cache: false
      })
      .state('support', {
        url: '/support',
        templateUrl: 'views/support/support.html',
        controller: 'SupportCtrl',
        cache: false
      })
      .state('support.list', {
        url: '/list',
        templateUrl: 'views/support/list/list.html',
        controller: 'SupportListCtrl',
        cache: false
      })
      .state('support.xb', {
        url: '/xb',
        templateUrl: 'views/support/details/xb/xb.html',
        controller: 'SupportXBDetailsCtrl',
        cache: false
      })
      .state('support.xxb', {
        url: '/xxb',
        templateUrl: 'views/support/details/xxb/xxb.html',
        controller: 'SupportXXBDetailsCtrl',
        cache: false
      })
      .state('support.download', {
        url: '/download',
        templateUrl: 'views/support/download/download.html',
        controller: 'SupportDownloadCtrl',
        cache: false
      })
      .state('smartPlus', {
        url: '/smart-plus',
        templateUrl: 'views/smart-plus/smart-plus.html',
        controller: 'SmartPlusCtrl',
        cache: false
      })
      .state('wifiQrCode', {
        url: '/wifi-qr-code',
        templateUrl: 'views/wifi-qr-code/wifi-qr-code.html',
        controller: 'WifiQrCodeCtrl',
        cache: false
      });
    //default router
    $urlRouterProvider.otherwise('/dash');
  }]);

/**
 * Created by psy on 2016/2/26.
 */
(function (angualr) {
  "use strict";

  angular.module('starter.components', []);
})(angular);

/**
 *create by psy at 16/8/29
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
(function (angular) {
  "use strict";

  angular.module('services')

    .service('s$news', ['restHapi', function (restHapi) {
      var s$news = this;

      s$news.query = function (page) {
        return restHapi('', 'get', {
          m: 'list',
          a: 'getPage',
          id: 1,
          p: page.pageNum
        });
      }

      s$news.queryById = function (id, cid) {
        return restHapi('', 'get', {
          m: 'article',
          a: 'jsonDetails',
          id: id,
          cid: cid
        });
      }

      return s$news;
    }]);
})(angular);

/**
 *create by psy at 16/8/10
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
(function (window, angular) {
  "use strict";

  angular.module('utils')

    .service('restHapi', ['$http', '$q', function ($http, $q) {
      var apiRoot = 'http://news.gowild.cn/index.php';

      var buildOptions = function (path, method, params, needParse) {
        var url = apiRoot + path;
        var options = {
          url: url,
          headers: {
            //Authorization: deviceUtil.getAccessToken()
          },
          method: method
        };
        if (method === 'get' || needParse) {
          var paramArray = [];
          for (var key in params) {
            paramArray.push(key + '=' + params[key]);
          }

          options.url += '?' + paramArray.join('&');
        }
        else {
          options.data = params;
        }

        return options;
      }
      var checkHttpRequest = function (res) {
        if (res.status !== 200) {
          alert('网络错误,status code:' + res.status);
        }
        return res.data;
      }
      var checkServerData = function (data) {
        // if (data.code !== 100) {
        //   alert(data.desc);
        // }
        return data;
      }
      var getResData = function (res) {
        var data = res.res;

        return data;
      }
      var restHapi = function (path, method, params, needParse) {
        var options = buildOptions(path, method, params, needParse);
        var promise = $http(options)
          .then(checkHttpRequest)
          .then(checkServerData)
          .then(getResData);

        return promise;
      }

      return restHapi;
    }])
})(window, angular);

/**
 * Created by psy on 2016/2/26.
 */
(function (angular) {
  "use strict";
  
  angular.module('starter.controllers', []);
})(angular);

/**
 * Created by dell on 2016/8/12.
 */

(function (window, angular) {
  "use strict";

  angular.module('starter.components')

    .directive('accordion', [function () {
      return {
        restrict: 'E',
        scope: {
          title: '@',
          iconText: '@'
        },
        templateUrl: './components/accordion/accordion.html',
        replace: true,
        transclude: true,
        link: function (scope, ele, attr) {
          scope.isActivated = false;
          scope.menuState = false;
          scope.toggleActive = function () {
            scope.isActivated = !scope.isActivated;
            scope.menuState = !scope.menuState;
          }
        }
      }
    }]);
})(window, angular);

/**
 *create by psy at 16/7/6
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
(function (angular) {
  'use strict';

  angular.module('starter.components')
    .directive('navBar', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        require: {},
        templateUrl: './components/nav-bar/nav-bar.html',
        replace: true,
        link: function ($scope, $ele, $attr) {
          $scope.navBar = {
            isActivated: false,
            toggleActive: function () {
              this.isActivated = !this.isActivated;
            },
            datas: [{
              state: 'xb',
              title: '公子&bull;小白',
            }, {
              state: 'xxb',
              title: '公子小白|青春版',
            }, {
              state: 'star',
              title: '公子小白|IP定制款',
            }, {
              state: 'smartPlus',
              title: '公子小白Smart Plus',
            }, {
              state: 'news.list',
              title: '新闻资讯',
            }, {
              state: 'news',
              title: '小尾巴社群',
            }, {
              state: 'support.list',
              title: '服务支持',
            }, {
              state: 'about',
              title: '关于我们',
            }, {
              state: 'wifiQrCode',
              title: '旧机器联网二维� �'
            }]
          }
        }
      }
    }]);
})(angular);

/**
 *create by psy at 16/7/6
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
(function (angular) {
  "use strict";
  angular.module('starter.components')
    .directive('gowildFooter', [function () {
      'use strict';

      return {
        restrict: 'E',
        replace: true,
        templateUrl: './components/footer/footer.html',
        link: function ($scope, $ele, $attr) {

        },
      }
    }]);
})(angular);

/**
 *create by psy at 16/9/26
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

(function (angular) {
  "use strict";

  angular.module('starter.components')

    .directive('onLoadStart', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, ele, attr) {
          var onload = $parse(attr.onLoadStart);

          ele[0].onload = function (e) {
            scope.$apply(function () {
              onload(scope, { $event: e });
            })
          }
        }
      }
    }])
})(angular);

/**
 *create by psy at 16/8/15
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

(function (angular, window) {
  "use strict";

  angular.module('starter.components')

    .directive('swiper', [function () {
      return {
        restrict: 'E',
        require: {
          slides: '?'
        },
        replace: true,
        templateUrl: './components/swiper/swiper.html',
        link: function (scope, ele, attr) {
          var slideItemWidth = ele[0].offsetWidth / ((scope.slides.length + 1) * 1.6);
          for (var i = 0; i < scope.slides.length; i++) {
            var slide = scope.slides[i];

            slide.width = slideItemWidth;
            slide.transform = 0;
          }

          //set default active item
          scope.activeIndex = parseInt(scope.slides.length / 2);

          scope.slideTo = function (activeIndex) {
            for (var i = 0; i < scope.slides.length; i++) {
              var slide = scope.slides[i];
              var absDiffVal = Math.abs(activeIndex - i);

              slide.scale = 1.8 - absDiffVal * 0.3;

              //according move direction to calc slide-item transform
              var slideDistance = activeIndex - scope.activeIndex;
              slide.transform -= slideDistance * slideItemWidth;
            }

            scope.activeIndex = activeIndex;
          }

          scope.slideTo(scope.activeIndex);
        }
      }
    }])
})(angular, window);

/**
 *create by psy at 16/8/26
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

(function (angular) {
  "use strict";

  angular.module('starter.components')

    .directive('scrollView', [function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          onChangeTitle: '&'
        },
        transclude: true,
        templateUrl: './components/scroll-view/scroll-view.html',
        link: function (scope, ele, attr) {
          ele[0].addEventListener('touchmove', function (event) {
            var elePath = event.path;

            for (var i = 0; i < elePath.length; i++) {
              var reg = /^star/;
              if (reg.test(elePath[i].className)) {
                scope.onChangeTitle({
                  $title: elePath[i].dataset.title
                });
              }
            }

          })
        }
      }
    }])
})(angular);

/**
 * Created by dell on 2016/7/8.
 */
(function (angular) {
  'use strict';

  angular.module('starter.controllers')
    .controller('PurchaseCtrl', ['$scope', function ($scope) {

    }]);
})(angular);

/**
 * Created by dell on 2016/7/8.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('AboutCtrl', ['$scope', function ($scope) {

    }]);
})(angular, window);

/**
 *create by psy at 16/7/5
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

(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('DashCtrl', ['$scope', function ($scope) {
      $scope.slides = [
        { imageUrl: './img/index/xiaoxiaobai1.png', color: '#c85724', },
        { imageUrl: './img/index/xiaoxiaobai2.png', color: '#000', },
        { imageUrl: './img/index/xiaoxiaobai3.png', color: '#fff', },
        { imageUrl: './img/index/xiaoxiaobai4.png', color: '#a4fe48', },
        { imageUrl: './img/index/xiaoxiaobai5.png', color: '#1f9fbc', },
      ];
    }]);
})(angular, window);

/**
 *create by psy at 16/8/29
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

(function (angular) {
  "use strict";

  angular.module('starter.controllers')

    .controller('NewsCtrl', function () {

    });
})(angular);

/**
 * Created by dell on 2016/8/19.
 */


(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('SmartPlusCtrl', ['$scope', function ($scope) {

    }]);
})(angular, window);

/**
 *create by psy at 16/8/31
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

(function (angular) {
  "use strict";

  angular.module('starter.controllers')

    .controller('SupportCtrl', [function ($scope) {

    }]);
})(angular);

/**
 *create by psy at 16/8/31
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

(function (angular) {
  "use strict";

  angular.module('starter.controllers')

    .controller('WifiQrCodeCtrl', ['$scope', '$ionicLoading', '$timeout', function ($scope, $ionicLoading, $timeout) {
      $scope.qrCode = {
        account: '',
        ssid: '',
        sex: '男',
        name: '狗尾草',
        pwd: ''
      };
      $scope.getQrCodeUrl = function () {
        var now = new Date();
        var qrCodeUrl = 'http://58.67.213.148:6031/system/qrcode?json=' + JSON.stringify($scope.qrCode) + '&_=' + now.getTime();

        return qrCodeUrl;
      }
      $scope.qrCodeurl = $scope.getQrCodeUrl();

      $scope.generateQrCode = function () {
        $scope.qrCodeurl = $scope.getQrCodeUrl();
        $ionicLoading.show();
      }
      $scope.onImageLoaded = function ($event) {
        $timeout(function () {
          $ionicLoading.hide();
        }, 600);
      }
    }]);
})(angular);

/**
 *create by psy at 16/8/26
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

/**
 * Created by dell on 2016/7/8.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('NewsListCtrl', ['$scope', 's$news', function ($scope, s$news) {
      $scope.newsList = {
        items: [],
        hasMore: false,
        page: {
          pageNum: 1,
          pageSize: 30,
        },
        loadData: function () {
          s$news.query($scope.newsList.page)
            .then(function (res) {
              for (var i = 0; i < res.data.length; i++) {
                var vocabularyItem = res.data[i];

                $scope.newsList.items.push(vocabularyItem)
              }

              $scope.newsList.hasMore = res.hasNextPage;
            });
        },
        loadMore: function () {
          this.loadData();
          this.page.pageNum++;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },
      };

      $scope.newsList.loadMore();

    }]);
})(angular, window);

/**
 * Created by dell on 2016/8/24.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('NewsDetailCtrl', ['$scope', 's$news', function ($scope, s$news) {
      $scope.newsModel = {};
      s$news.queryById($scope.$stateParams.id, $scope.$stateParams.cid)
        .then(function (res) {
          $scope.newsModel = res;
        })
    }]);
})(angular, window);

/**
 *create by psy at 16/7/7
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
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('StarCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      $scope.currentMovedTitle = '公子小白青春版IP定制款';

      $scope.handleChangeTitle = function (title) {
        $timeout(function () {
          $scope.currentMovedTitle = title;
        }, 0);
      }
    }
    ]);
})(angular, window);

/**
 *create by psy at 16/7/7
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
(function (angular, window) {
  'use strict';
  angular.module('starter.controllers')
    .controller('XxbCtrl', ['$scope', function ($scope) {

    }])
})(angular, window);


/**
 *create by psy at 16/7/7
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
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('XbCtrl', ['$scope', function ($scope) {

    }]);
})(angular, window);

/**
 * Created by dell on 2016/8/19.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('SupportDownloadCtrl', ['$scope', function ($scope) {

    }]);
})(angular, window);

/**
 * Created by dell on 2016/7/8.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('SupportListCtrl', ['$scope', function ($scope) {
      $scope.myVar = false;
      $scope.myMask = false;
      $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
        $scope.myMask = !$scope.myMask;
      }
    }]);
})(angular, window);

/**
 * Created by dell on 2016/7/8.
 */
(function (angular, window) {
  'use strict';

  angular.module('starter.controllers')
    .controller('SupportXBDetailsCtrl', ['$scope', function ($scope) {

    }]);
})(angular, window);

/**
 *create by psy at 16/8/31
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
(function (angular) {
  "use strict";

  angular.module('starter.controllers')

    .controller('SupportXXBDetailsCtrl', [function () {

    }]);
})(angular);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbXBvbmVudHMvY29tcG9uZW50cy5qcyIsInNlcnZpY2VzL25ld3MuanMiLCJ1dGlscy9yZXN0LWhhcGkuanMiLCJ2aWV3cy9jb250cm9sbGVycy5qcyIsImNvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbi5qcyIsImNvbXBvbmVudHMvbmF2LWJhci9uYXYtYmFyLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmpzIiwiY29tcG9uZW50cy9pbWcvb24tbG9hZC1zdGFydC5qcyIsImNvbXBvbmVudHMvc3dpcGVyL3N3aXBlci5qcyIsImNvbXBvbmVudHMvc2Nyb2xsLXZpZXcvc2Nyb2xsLXZpZXcuanMiLCJ2aWV3cy9QdXJjaGFzZS9wdXJjaHNlLmpzIiwidmlld3MvYWJvdXQvYWJvdXQuanMiLCJ2aWV3cy9kYXNoL2Rhc2guanMiLCJ2aWV3cy9uZXdzL25ld3MuanMiLCJ2aWV3cy9zbWFydC1wbHVzL3NtYXJ0LXBsdXMuanMiLCJ2aWV3cy9zdXBwb3J0L3N1cHBvcnQuanMiLCJ2aWV3cy93aWZpLXFyLWNvZGUvd2lmaS1xci1jb2RlLmpzIiwiY29tcG9uZW50cy9zY3JvbGwtdmlldy9zY3JvbGwtaXRlbS9zY3JvbGwtaXRlbS5qcyIsInZpZXdzL25ld3MvbGlzdC9saXN0LmpzIiwidmlld3MvbmV3cy9uZXdzLWRldGFpbC9uZXdzLWRldGFpbC5qcyIsInZpZXdzL3Byb2R1Y3Qvc3Rhci9zdGFyLmpzIiwidmlld3MvcHJvZHVjdC94eGIveHhiLmpzIiwidmlld3MvcHJvZHVjdC94Yi94Yi5qcyIsInZpZXdzL3N1cHBvcnQvZG93bmxvYWQvZG93bmxvYWQuanMiLCJ2aWV3cy9zdXBwb3J0L2xpc3QvbGlzdC5qcyIsInZpZXdzL3N1cHBvcnQvZGV0YWlscy94Yi94Yi5qcyIsInZpZXdzL3N1cHBvcnQvZGV0YWlscy94eGIveHhiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9yZWdpc3RlciByZXF1aXJlZCBtb2R1bGVcblxuYW5ndWxhci5tb2R1bGUoJ3V0aWxzJywgW10pO1xuYW5ndWxhci5tb2R1bGUoJ3NlcnZpY2VzJywgW10pO1xuXG5hbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsndWkucm91dGVyJywgJ2lvbmljJywgJ3V0aWxzJywgJ3NlcnZpY2VzJywgJ3N0YXJ0ZXIuY29tcG9uZW50cycsICdzdGFydGVyLmNvbnRyb2xsZXJzJ10pXG4gIC5ydW4oWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckbG9jYXRpb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlLCAkbG9jYXRpb24pIHtcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xuICAgICAgLy9iaW5kICRzdGF0ZSB0byByb290IHNjb3BlXG4gICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gdG9QYXJhbXM7XG4gICAgfSk7XG4gIH1dKVxuICAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJyRpb25pY0NvbmZpZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRpb25pY0NvbmZpZ1Byb3ZpZGVyKSB7XG5cbiAgICAkaW9uaWNDb25maWdQcm92aWRlci5uYXZCYXIuYWxpZ25UaXRsZSgnY2VudGVyJyk7XG4gICAgLy91c2UgYnJvd3NlciBzY3JvbGxcbiAgICAkaW9uaWNDb25maWdQcm92aWRlci5zY3JvbGxpbmcuanNTY3JvbGxpbmcoZmFsc2UpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSgnZGFzaCcsIHtcbiAgICAgICAgdXJsOiAnL2Rhc2gnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2gvZGFzaC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCd4YicsIHtcbiAgICAgICAgdXJsOiAnL3hiJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3hiL3hiLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnWGJDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCd4eGInLCB7XG4gICAgICAgIHVybDogJy94eGInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QveHhiL3h4Yi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1h4YkN0cmwnLFxuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3N0YXInLCB7XG4gICAgICAgIHVybDogJy9zdGFyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3N0YXIvc3Rhci5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1N0YXJDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCduZXdzJywge1xuICAgICAgICB1cmw6ICcvbmV3cycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbmV3cy9uZXdzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3c0N0cmwnLFxuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ25ld3MubGlzdCcsIHtcbiAgICAgICAgdXJsOiAnL2xpc3QnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL25ld3MvbGlzdC9saXN0Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3c0xpc3RDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnbmV3cy5kZXRhaWxzJywge1xuICAgICAgICB1cmw6ICcvZGV0YWlscy86Y2lkLzppZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbmV3cy9uZXdzLWRldGFpbC9uZXdzLWRldGFpbC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld3NEZXRhaWxDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgdXJsOiAnL2Fib3V0JyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9hYm91dC9hYm91dC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0Fib3V0Q3RybCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgncHVyY2hhc2UnLCB7XG4gICAgICAgIHVybDogJy9wdXJjaGFzZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcHVyY2hhc2UvcHVyY2hhc2UuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQdXJjaGFzZUN0cmwnLFxuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3N1cHBvcnQnLCB7XG4gICAgICAgIHVybDogJy9zdXBwb3J0JyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9zdXBwb3J0L3N1cHBvcnQuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdXBwb3J0Q3RybCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnc3VwcG9ydC5saXN0Jywge1xuICAgICAgICB1cmw6ICcvbGlzdCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvc3VwcG9ydC9saXN0L2xpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdXBwb3J0TGlzdEN0cmwnLFxuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3N1cHBvcnQueGInLCB7XG4gICAgICAgIHVybDogJy94YicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvc3VwcG9ydC9kZXRhaWxzL3hiL3hiLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnU3VwcG9ydFhCRGV0YWlsc0N0cmwnLFxuICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3N1cHBvcnQueHhiJywge1xuICAgICAgICB1cmw6ICcveHhiJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9zdXBwb3J0L2RldGFpbHMveHhiL3h4Yi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1N1cHBvcnRYWEJEZXRhaWxzQ3RybCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnc3VwcG9ydC5kb3dubG9hZCcsIHtcbiAgICAgICAgdXJsOiAnL2Rvd25sb2FkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9zdXBwb3J0L2Rvd25sb2FkL2Rvd25sb2FkLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnU3VwcG9ydERvd25sb2FkQ3RybCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnc21hcnRQbHVzJywge1xuICAgICAgICB1cmw6ICcvc21hcnQtcGx1cycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvc21hcnQtcGx1cy9zbWFydC1wbHVzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnU21hcnRQbHVzQ3RybCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnd2lmaVFyQ29kZScsIHtcbiAgICAgICAgdXJsOiAnL3dpZmktcXItY29kZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3Mvd2lmaS1xci1jb2RlL3dpZmktcXItY29kZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1dpZmlRckNvZGVDdHJsJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAvL2RlZmF1bHQgcm91dGVyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2Rhc2gnKTtcbiAgfV0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHBzeSBvbiAyMDE2LzIvMjYuXG4gKi9cbihmdW5jdGlvbiAoYW5ndWFscikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb21wb25lbnRzJywgW10pO1xufSkoYW5ndWxhcik7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi84LzI5XG4gKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgR293aWxkIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzZXJ2aWNlcycpXG5cbiAgICAuc2VydmljZSgncyRuZXdzJywgWydyZXN0SGFwaScsIGZ1bmN0aW9uIChyZXN0SGFwaSkge1xuICAgICAgdmFyIHMkbmV3cyA9IHRoaXM7XG5cbiAgICAgIHMkbmV3cy5xdWVyeSA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHJldHVybiByZXN0SGFwaSgnJywgJ2dldCcsIHtcbiAgICAgICAgICBtOiAnbGlzdCcsXG4gICAgICAgICAgYTogJ2dldFBhZ2UnLFxuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHA6IHBhZ2UucGFnZU51bVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcyRuZXdzLnF1ZXJ5QnlJZCA9IGZ1bmN0aW9uIChpZCwgY2lkKSB7XG4gICAgICAgIHJldHVybiByZXN0SGFwaSgnJywgJ2dldCcsIHtcbiAgICAgICAgICBtOiAnYXJ0aWNsZScsXG4gICAgICAgICAgYTogJ2pzb25EZXRhaWxzJyxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgY2lkOiBjaWRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzJG5ld3M7XG4gICAgfV0pO1xufSkoYW5ndWxhcik7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi84LzEwXG4gKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgR293aWxkIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuKGZ1bmN0aW9uICh3aW5kb3csIGFuZ3VsYXIpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3V0aWxzJylcblxuICAgIC5zZXJ2aWNlKCdyZXN0SGFwaScsIFsnJGh0dHAnLCAnJHEnLCBmdW5jdGlvbiAoJGh0dHAsICRxKSB7XG4gICAgICB2YXIgYXBpUm9vdCA9ICdodHRwOi8vbmV3cy5nb3dpbGQuY24vaW5kZXgucGhwJztcblxuICAgICAgdmFyIGJ1aWxkT3B0aW9ucyA9IGZ1bmN0aW9uIChwYXRoLCBtZXRob2QsIHBhcmFtcywgbmVlZFBhcnNlKSB7XG4gICAgICAgIHZhciB1cmwgPSBhcGlSb290ICsgcGF0aDtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgLy9BdXRob3JpemF0aW9uOiBkZXZpY2VVdGlsLmdldEFjY2Vzc1Rva2VuKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgICAgIH07XG4gICAgICAgIGlmIChtZXRob2QgPT09ICdnZXQnIHx8IG5lZWRQYXJzZSkge1xuICAgICAgICAgIHZhciBwYXJhbUFycmF5ID0gW107XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1BcnJheS5wdXNoKGtleSArICc9JyArIHBhcmFtc1trZXldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLnVybCArPSAnPycgKyBwYXJhbUFycmF5LmpvaW4oJyYnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmRhdGEgPSBwYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH1cbiAgICAgIHZhciBjaGVja0h0dHBSZXF1ZXN0ID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgYWxlcnQoJ+e9kee7nOmUmeivryxzdGF0dXMgY29kZTonICsgcmVzLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgfVxuICAgICAgdmFyIGNoZWNrU2VydmVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIGlmIChkYXRhLmNvZGUgIT09IDEwMCkge1xuICAgICAgICAvLyAgIGFsZXJ0KGRhdGEuZGVzYyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgICB2YXIgZ2V0UmVzRGF0YSA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXMucmVzO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3RIYXBpID0gZnVuY3Rpb24gKHBhdGgsIG1ldGhvZCwgcGFyYW1zLCBuZWVkUGFyc2UpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBidWlsZE9wdGlvbnMocGF0aCwgbWV0aG9kLCBwYXJhbXMsIG5lZWRQYXJzZSk7XG4gICAgICAgIHZhciBwcm9taXNlID0gJGh0dHAob3B0aW9ucylcbiAgICAgICAgICAudGhlbihjaGVja0h0dHBSZXF1ZXN0KVxuICAgICAgICAgIC50aGVuKGNoZWNrU2VydmVyRGF0YSlcbiAgICAgICAgICAudGhlbihnZXRSZXNEYXRhKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3RIYXBpO1xuICAgIH1dKVxufSkod2luZG93LCBhbmd1bGFyKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBwc3kgb24gMjAxNi8yLzI2LlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIFxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb250cm9sbGVycycsIFtdKTtcbn0pKGFuZ3VsYXIpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNi84LzEyLlxuICovXG5cbihmdW5jdGlvbiAod2luZG93LCBhbmd1bGFyKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbXBvbmVudHMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnYWNjb3JkaW9uJywgW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgdGl0bGU6ICdAJyxcbiAgICAgICAgICBpY29uVGV4dDogJ0AnXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24uaHRtbCcsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlLCBhdHRyKSB7XG4gICAgICAgICAgc2NvcGUuaXNBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICBzY29wZS5tZW51U3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICBzY29wZS50b2dnbGVBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5pc0FjdGl2YXRlZCA9ICFzY29wZS5pc0FjdGl2YXRlZDtcbiAgICAgICAgICAgIHNjb3BlLm1lbnVTdGF0ZSA9ICFzY29wZS5tZW51U3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pO1xufSkod2luZG93LCBhbmd1bGFyKTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzcvNlxuICpcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEdvd2lsZCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbihmdW5jdGlvbiAoYW5ndWxhcikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29tcG9uZW50cycpXG4gICAgLmRpcmVjdGl2ZSgnbmF2QmFyJywgWyckdGltZW91dCcsIGZ1bmN0aW9uICgkdGltZW91dCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVxdWlyZToge30sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL25hdi1iYXIvbmF2LWJhci5odG1sJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZSwgJGF0dHIpIHtcbiAgICAgICAgICAkc2NvcGUubmF2QmFyID0ge1xuICAgICAgICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9nZ2xlQWN0aXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmF0ZWQgPSAhdGhpcy5pc0FjdGl2YXRlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhczogW3tcbiAgICAgICAgICAgICAgc3RhdGU6ICd4YicsXG4gICAgICAgICAgICAgIHRpdGxlOiAn5YWs5a2QJmJ1bGw75bCP55m9JyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgc3RhdGU6ICd4eGInLFxuICAgICAgICAgICAgICB0aXRsZTogJ+WFrOWtkOWwj+eZvXzpnZLmmKXniYgnLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBzdGF0ZTogJ3N0YXInLFxuICAgICAgICAgICAgICB0aXRsZTogJ+WFrOWtkOWwj+eZvXxJUOWumuWItuasvicsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHN0YXRlOiAnc21hcnRQbHVzJyxcbiAgICAgICAgICAgICAgdGl0bGU6ICflhazlrZDlsI/nmb1TbWFydCBQbHVzJyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgc3RhdGU6ICduZXdzLmxpc3QnLFxuICAgICAgICAgICAgICB0aXRsZTogJ+aWsOmXu+i1hOiurycsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHN0YXRlOiAnbmV3cycsXG4gICAgICAgICAgICAgIHRpdGxlOiAn5bCP5bC+5be056S+576kJyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgc3RhdGU6ICdzdXBwb3J0Lmxpc3QnLFxuICAgICAgICAgICAgICB0aXRsZTogJ+acjeWKoeaUr+aMgScsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHN0YXRlOiAnYWJvdXQnLFxuICAgICAgICAgICAgICB0aXRsZTogJ+WFs+S6juaIkeS7rCcsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHN0YXRlOiAnd2lmaVFyQ29kZScsXG4gICAgICAgICAgICAgIHRpdGxlOiAn5pen5py65Zmo6IGU572R5LqM57u056CBJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSk7XG59KShhbmd1bGFyKTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzcvNlxuICpcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEdvd2lsZCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbihmdW5jdGlvbiAoYW5ndWxhcikge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29tcG9uZW50cycpXG4gICAgLmRpcmVjdGl2ZSgnZ293aWxkRm9vdGVyJywgW2Z1bmN0aW9uICgpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZSwgJGF0dHIpIHtcblxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1dKTtcbn0pKGFuZ3VsYXIpO1xuIiwiLyoqXG4gKmNyZWF0ZSBieSBwc3kgYXQgMTYvOS8yNlxuICpcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEdvd2lsZCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uIChhbmd1bGFyKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbXBvbmVudHMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnb25Mb2FkU3RhcnQnLCBbJyRwYXJzZScsIGZ1bmN0aW9uICgkcGFyc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlLCBhdHRyKSB7XG4gICAgICAgICAgdmFyIG9ubG9hZCA9ICRwYXJzZShhdHRyLm9uTG9hZFN0YXJ0KTtcblxuICAgICAgICAgIGVsZVswXS5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgb25sb2FkKHNjb3BlLCB7ICRldmVudDogZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pXG59KShhbmd1bGFyKTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzgvMTVcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbihmdW5jdGlvbiAoYW5ndWxhciwgd2luZG93KSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbXBvbmVudHMnKVxuXG4gICAgLmRpcmVjdGl2ZSgnc3dpcGVyJywgW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHJlcXVpcmU6IHtcbiAgICAgICAgICBzbGlkZXM6ICc/J1xuICAgICAgICB9LFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50cy9zd2lwZXIvc3dpcGVyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZSwgYXR0cikge1xuICAgICAgICAgIHZhciBzbGlkZUl0ZW1XaWR0aCA9IGVsZVswXS5vZmZzZXRXaWR0aCAvICgoc2NvcGUuc2xpZGVzLmxlbmd0aCArIDEpICogMS42KTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNsaWRlID0gc2NvcGUuc2xpZGVzW2ldO1xuXG4gICAgICAgICAgICBzbGlkZS53aWR0aCA9IHNsaWRlSXRlbVdpZHRoO1xuICAgICAgICAgICAgc2xpZGUudHJhbnNmb3JtID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL3NldCBkZWZhdWx0IGFjdGl2ZSBpdGVtXG4gICAgICAgICAgc2NvcGUuYWN0aXZlSW5kZXggPSBwYXJzZUludChzY29wZS5zbGlkZXMubGVuZ3RoIC8gMik7XG5cbiAgICAgICAgICBzY29wZS5zbGlkZVRvID0gZnVuY3Rpb24gKGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3BlLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzY29wZS5zbGlkZXNbaV07XG4gICAgICAgICAgICAgIHZhciBhYnNEaWZmVmFsID0gTWF0aC5hYnMoYWN0aXZlSW5kZXggLSBpKTtcblxuICAgICAgICAgICAgICBzbGlkZS5zY2FsZSA9IDEuOCAtIGFic0RpZmZWYWwgKiAwLjM7XG5cbiAgICAgICAgICAgICAgLy9hY2NvcmRpbmcgbW92ZSBkaXJlY3Rpb24gdG8gY2FsYyBzbGlkZS1pdGVtIHRyYW5zZm9ybVxuICAgICAgICAgICAgICB2YXIgc2xpZGVEaXN0YW5jZSA9IGFjdGl2ZUluZGV4IC0gc2NvcGUuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgIHNsaWRlLnRyYW5zZm9ybSAtPSBzbGlkZURpc3RhbmNlICogc2xpZGVJdGVtV2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3BlLmFjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2NvcGUuc2xpZGVUbyhzY29wZS5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XSlcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi84LzI2XG4gKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgR293aWxkIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29tcG9uZW50cycpXG5cbiAgICAuZGlyZWN0aXZlKCdzY3JvbGxWaWV3JywgW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgb25DaGFuZ2VUaXRsZTogJyYnXG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL3Njcm9sbC12aWV3L3Njcm9sbC12aWV3Lmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZSwgYXR0cikge1xuICAgICAgICAgIGVsZVswXS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlbGVQYXRoID0gZXZlbnQucGF0aDtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciByZWcgPSAvXnN0YXIvO1xuICAgICAgICAgICAgICBpZiAocmVnLnRlc3QoZWxlUGF0aFtpXS5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUub25DaGFuZ2VUaXRsZSh7XG4gICAgICAgICAgICAgICAgICAkdGl0bGU6IGVsZVBhdGhbaV0uZGF0YXNldC50aXRsZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfV0pXG59KShhbmd1bGFyKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTYvNy84LlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignUHVyY2hhc2VDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICB9XSk7XG59KShhbmd1bGFyKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTYvNy84LlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIHdpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnKVxuICAgIC5jb250cm9sbGVyKCdBYm91dEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi83LzVcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbihmdW5jdGlvbiAoYW5ndWxhciwgd2luZG93KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb250cm9sbGVycycpXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAkc2NvcGUuc2xpZGVzID0gW1xuICAgICAgICB7IGltYWdlVXJsOiAnLi9pbWcvaW5kZXgveGlhb3hpYW9iYWkxLnBuZycsIGNvbG9yOiAnI2M4NTcyNCcsIH0sXG4gICAgICAgIHsgaW1hZ2VVcmw6ICcuL2ltZy9pbmRleC94aWFveGlhb2JhaTIucG5nJywgY29sb3I6ICcjMDAwJywgfSxcbiAgICAgICAgeyBpbWFnZVVybDogJy4vaW1nL2luZGV4L3hpYW94aWFvYmFpMy5wbmcnLCBjb2xvcjogJyNmZmYnLCB9LFxuICAgICAgICB7IGltYWdlVXJsOiAnLi9pbWcvaW5kZXgveGlhb3hpYW9iYWk0LnBuZycsIGNvbG9yOiAnI2E0ZmU0OCcsIH0sXG4gICAgICAgIHsgaW1hZ2VVcmw6ICcuL2ltZy9pbmRleC94aWFveGlhb2JhaTUucG5nJywgY29sb3I6ICcjMWY5ZmJjJywgfSxcbiAgICAgIF07XG4gICAgfV0pO1xufSkoYW5ndWxhciwgd2luZG93KTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzgvMjlcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbihmdW5jdGlvbiAoYW5ndWxhcikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb250cm9sbGVycycpXG5cbiAgICAuY29udHJvbGxlcignTmV3c0N0cmwnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB9KTtcbn0pKGFuZ3VsYXIpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNi84LzE5LlxuICovXG5cblxuKGZ1bmN0aW9uIChhbmd1bGFyLCB3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignU21hcnRQbHVzQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG4gICAgfV0pO1xufSkoYW5ndWxhciwgd2luZG93KTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzgvMzFcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbihmdW5jdGlvbiAoYW5ndWxhcikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb250cm9sbGVycycpXG5cbiAgICAuY29udHJvbGxlcignU3VwcG9ydEN0cmwnLCBbZnVuY3Rpb24gKCRzY29wZSkge1xuXG4gICAgfV0pO1xufSkoYW5ndWxhcik7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi84LzMxXG4gKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgR293aWxkIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnKVxuXG4gICAgLmNvbnRyb2xsZXIoJ1dpZmlRckNvZGVDdHJsJywgWyckc2NvcGUnLCAnJGlvbmljTG9hZGluZycsICckdGltZW91dCcsIGZ1bmN0aW9uICgkc2NvcGUsICRpb25pY0xvYWRpbmcsICR0aW1lb3V0KSB7XG4gICAgICAkc2NvcGUucXJDb2RlID0ge1xuICAgICAgICBhY2NvdW50OiAnJyxcbiAgICAgICAgc3NpZDogJycsXG4gICAgICAgIHNleDogJ+eUtycsXG4gICAgICAgIG5hbWU6ICfni5flsL7ojYknLFxuICAgICAgICBwd2Q6ICcnXG4gICAgICB9O1xuICAgICAgJHNjb3BlLmdldFFyQ29kZVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBxckNvZGVVcmwgPSAnaHR0cDovLzU4LjY3LjIxMy4xNDg6NjAzMS9zeXN0ZW0vcXJjb2RlP2pzb249JyArIEpTT04uc3RyaW5naWZ5KCRzY29wZS5xckNvZGUpICsgJyZfPScgKyBub3cuZ2V0VGltZSgpO1xuXG4gICAgICAgIHJldHVybiBxckNvZGVVcmw7XG4gICAgICB9XG4gICAgICAkc2NvcGUucXJDb2RldXJsID0gJHNjb3BlLmdldFFyQ29kZVVybCgpO1xuXG4gICAgICAkc2NvcGUuZ2VuZXJhdGVRckNvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5xckNvZGV1cmwgPSAkc2NvcGUuZ2V0UXJDb2RlVXJsKCk7XG4gICAgICAgICRpb25pY0xvYWRpbmcuc2hvdygpO1xuICAgICAgfVxuICAgICAgJHNjb3BlLm9uSW1hZ2VMb2FkZWQgPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkaW9uaWNMb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSwgNjAwKTtcbiAgICAgIH1cbiAgICB9XSk7XG59KShhbmd1bGFyKTtcbiIsIi8qKlxuICpjcmVhdGUgYnkgcHN5IGF0IDE2LzgvMjZcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE2LzcvOC5cbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCB3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignTmV3c0xpc3RDdHJsJywgWyckc2NvcGUnLCAncyRuZXdzJywgZnVuY3Rpb24gKCRzY29wZSwgcyRuZXdzKSB7XG4gICAgICAkc2NvcGUubmV3c0xpc3QgPSB7XG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgaGFzTW9yZTogZmFsc2UsXG4gICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICAgIHBhZ2VTaXplOiAzMCxcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZERhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzJG5ld3MucXVlcnkoJHNjb3BlLm5ld3NMaXN0LnBhZ2UpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdm9jYWJ1bGFyeUl0ZW0gPSByZXMuZGF0YVtpXTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5uZXdzTGlzdC5pdGVtcy5wdXNoKHZvY2FidWxhcnlJdGVtKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJHNjb3BlLm5ld3NMaXN0Lmhhc01vcmUgPSByZXMuaGFzTmV4dFBhZ2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZE1vcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgICAgdGhpcy5wYWdlLnBhZ2VOdW0rKztcbiAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnc2Nyb2xsLmluZmluaXRlU2Nyb2xsQ29tcGxldGUnKTtcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5uZXdzTGlzdC5sb2FkTW9yZSgpO1xuXG4gICAgfV0pO1xufSkoYW5ndWxhciwgd2luZG93KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTYvOC8yNC5cbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCB3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignTmV3c0RldGFpbEN0cmwnLCBbJyRzY29wZScsICdzJG5ld3MnLCBmdW5jdGlvbiAoJHNjb3BlLCBzJG5ld3MpIHtcbiAgICAgICRzY29wZS5uZXdzTW9kZWwgPSB7fTtcbiAgICAgIHMkbmV3cy5xdWVyeUJ5SWQoJHNjb3BlLiRzdGF0ZVBhcmFtcy5pZCwgJHNjb3BlLiRzdGF0ZVBhcmFtcy5jaWQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAkc2NvcGUubmV3c01vZGVsID0gcmVzO1xuICAgICAgICB9KVxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi83LzdcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIHdpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnKVxuICAgIC5jb250cm9sbGVyKCdTdGFyQ3RybCcsIFsnJHNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAgICAgICRzY29wZS5jdXJyZW50TW92ZWRUaXRsZSA9ICflhazlrZDlsI/nmb3pnZLmmKXniYhJUOWumuWItuasvic7XG5cbiAgICAgICRzY29wZS5oYW5kbGVDaGFuZ2VUaXRsZSA9IGZ1bmN0aW9uICh0aXRsZSkge1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnRNb3ZlZFRpdGxlID0gdGl0bGU7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgICBdKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi83LzdcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIHdpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignWHhiQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG4gICAgfV0pXG59KShhbmd1bGFyLCB3aW5kb3cpO1xuXG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi83LzdcbiAqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBHb3dpbGQgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIHdpbmRvdykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnKVxuICAgIC5jb250cm9sbGVyKCdYYkN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE2LzgvMTkuXG4gKi9cbihmdW5jdGlvbiAoYW5ndWxhciwgd2luZG93KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlci5jb250cm9sbGVycycpXG4gICAgLmNvbnRyb2xsZXIoJ1N1cHBvcnREb3dubG9hZEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE2LzcvOC5cbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCB3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignU3VwcG9ydExpc3RDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAkc2NvcGUubXlWYXIgPSBmYWxzZTtcbiAgICAgICRzY29wZS5teU1hc2sgPSBmYWxzZTtcbiAgICAgICRzY29wZS50b2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm15VmFyID0gISRzY29wZS5teVZhcjtcbiAgICAgICAgJHNjb3BlLm15TWFzayA9ICEkc2NvcGUubXlNYXNrO1xuICAgICAgfVxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE2LzcvOC5cbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCB3aW5kb3cpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcbiAgICAuY29udHJvbGxlcignU3VwcG9ydFhCRGV0YWlsc0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgIH1dKTtcbn0pKGFuZ3VsYXIsIHdpbmRvdyk7XG4iLCIvKipcbiAqY3JlYXRlIGJ5IHBzeSBhdCAxNi84LzMxXG4gKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgR293aWxkIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJylcblxuICAgIC5jb250cm9sbGVyKCdTdXBwb3J0WFhCRGV0YWlsc0N0cmwnLCBbZnVuY3Rpb24gKCkge1xuXG4gICAgfV0pO1xufSkoYW5ndWxhcik7XG4iXX0=
