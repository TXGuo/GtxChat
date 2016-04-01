angular.module('chatModule', ['ngRoute', 'angularMoment']);
angular.module('chatModule').config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
    }).when('/room', {
        templateUrl: 'templates/room.html',
        controller: 'chatCtrl'
    }).when('/reg', {
        templateUrl: 'templates/reg.html',
        controller: 'regCtrl'
    }).when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    }).when('/about', {
        templateUrl: 'templates/about.html'
    }).otherwise({
        redirectTo: '/'
    })
})

//验证是否登录
angular.module('chatModule').run(function ($rootScope, amMoment, $location, validateServer) {
    amMoment.changeLocale('zh-cn');
    validateServer.success(function (data) {
        if (data.resultCode == 1) {
            $rootScope.user = data['user'];
            $location.path('/room');
        } else {
            $location.path('/login');
        }
    }).error(function (err) {
        $location.path('/login');
    })
})