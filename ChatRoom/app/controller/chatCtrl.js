angular.module('chatModule').controller('chatCtrl', function ($rootScope, $scope, socketServer, $location, $anchorScroll) {
    $scope.messages = [];
    $scope.newMessage = '';

    //连接服务器 欢迎语
    socketServer.on('connected', function () {
    });

    //向服务器获取所有消息
    socketServer.emit('message.all');
    socketServer.on('messageAll', function (messages) {
        $scope.messages = messages;
    })

    //发言
    $scope.sendMessage = function (e) {
        if ($scope.newMessage) {
            socketServer.emit('message.add', {
                username: $rootScope.user.username,
                message: $scope.newMessage,
                creatTime: new Date()
            });
            $scope.newMessage = ''

            //自动滚动到消息列表底部
            $location.hash('bottom');
            $anchorScroll();
        }
    }

    //接收新消息
    socketServer.on('message.new', function (data) {
        console.log(data);
        $scope.messages.push(data);
    });

    $scope.$on('$destroy', function () {
        socketServer.clear();
    })
})