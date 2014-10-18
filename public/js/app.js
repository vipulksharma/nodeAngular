(function (angular) {
    'use strict';

    function homeCtrl($scope, $rootScope,learningAppService) {
        var httpCall = learningAppService.callFunc('/getMeName');
        httpCall.get().then(function(data) {
            $scope.name = data;
        }, function(data) {
            console.log(data);
        });
    }
    angular.module('learningApp').controller('homeCtrl', ['$scope', '$rootScope', 'learningAppService', homeCtrl]);
})(angular);


