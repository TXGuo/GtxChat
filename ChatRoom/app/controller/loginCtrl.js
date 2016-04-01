angular.module('chatModule').controller('loginCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.user = {};
    $scope.login = function () {
        $http({
            url: 'users/login',
            method: 'post',
            data: $scope.user
        }).success(function (data) {
            if (data.resultCode == 1) {
                $rootScope.user = data["user"];
                $location.path('/room');
            } else {
                alert(data.msg);
            }
        }).error(function (data) {
            alert(data);
        })
    }
})