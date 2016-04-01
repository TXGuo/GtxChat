angular.module('chatModule').controller('regCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.user = {};
    $scope.reg = function () {
        $http({
            url: 'users/reg',
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