angular.module('chatModule', ['ngRoute']);
angular.module('chatModule').config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
    }).when('/room', {
        templateUrl: 'templates/room.html',
        controller: 'chatController'
    }).otherwise({
        redirectTo: '/'
    })
})