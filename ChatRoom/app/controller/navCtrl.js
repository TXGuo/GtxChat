angular.module('chatModule').controller('navCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.isActive = function (curUrl) {
        return $location.path() == curUrl;
    }
    $scope.logOut = function () {
        $http({
            url: 'users/logOut',
            method: 'get',
        }).success(function (data) {
            if (data.resultCode == 1) {
                $rootScope.user = null;
                $location.path('/login');
            } else {
                alert(data.msg);
            }
        }).error(function (data) {
            alert(data);
        })
    }
})