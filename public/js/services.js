(function (angular) {
    /**
     * Created by vipul on 17/2/14.
     */
//'use strict';

    angular.module('learningApp').factory("learningAppService", ['$http', '$rootScope', '$q', '$location', function ($http, $rootScope, $q, $location) {
        var learningAppServices = function (url) {

            var self = this;
            self.url = url;
            self.onError = function onError(type, data, deferred){
                if(data && (data.code == 401 || data.code == 449)) {
                    // don't open login popup if already open.
                    if(document.getElementsByClassName('sign-in-modal')[0] && document.getElementsByClassName('sign-in-modal')[0].style.display == "block"){
                        return;
                    }
                    if(data.code == 401) {
                        $rootScope.windowBackUrl = $location.path() ;
                        $rootScope.goWindowBack = true;
                        $rootScope.performOperation('/shop/logout');
                    }
                    if (type==='GET'){
                        $rootScope.isAuthError = true;
                    }
                    $rootScope.openLogin();
                }
                deferred.reject(data);
            };

            self.onException = function onException(self, skip_log, data) {
                try {
                    if (!skip_log && self.url.indexOf('/shop') == -1) {
                        $rootScope.logException(self.url, self.params, data);
                    }
                } catch (ex) {
                    throw ex;
                }
            };

            self.get = function (params,skip_log) {
                if (!params) params = {};
                params.channel = 'web';
                params.version = 2;
                var deferred = $q.defer();
                self.params = params;

                if(self.url.indexOf('https://catalog.paytm.com/v1/') > -1 || self.url.indexOf('https://catalogapidev.paytm.com/v1/') > -1) {
                    var url = self.url.indexOf('?') > -1 ? self.url + '&callback=JSON_CALLBACK' : self.url + '?callback=JSON_CALLBACK'
                    $http.jsonp(url).success(function(data) {
                        deferred.resolve(data);
                    }).error(function(data) {
                            self.onException(self, skip_log, data);
                            self.onError('GET', data, deferred);
                        });
                } else {
                    $http.get(self.url, {params: params}).success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                            self.onException(self, skip_log, data);
                            self.onError('GET', data, deferred);
                        });
                }
                return deferred.promise;
            };
            self.post = function (params,skip_log) {
                params.channel = 'web';
                params.version = 2;
                self.params = params;
                var deferred = $q.defer();
                var config = {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    'dataType': 'json'
                };

                $http.post(self.url, params, config).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                        self.onException(self, skip_log, data);
                        self.onError('POST', data, deferred);
                    });
                return deferred.promise;
            };
            self.update = function (params,skip_log) {
                var deferred = $q.defer();
                params.channel = 'web';
                params.version = 2;
                self.params = params;
                $http.put(self.url, params).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                        self.onException(self, skip_log, data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            self.delete = function (params,log_flag) {
                var deferred = $q.defer();
                params.channel = 'web';
                params.version = 2;
                self.params = params;
                $http['delete'](self.url, params).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                        self.onException(self, skip_log, data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
        };
        var svc = {
            callFunc: function (url) {
                if (!url) {
                    return false;
                }
                return new learningAppServices(url);
            }
        };
        return svc;
    }]);

})(angular);
