angular.module('chatModule').factory('validateServer', function ($http) {
    return $http({
        url: 'users/validate',
        method: 'get'
    })
})
