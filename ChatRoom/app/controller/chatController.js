angular.module('chatModule').controller('chatController', function ($scope, socketServer) {
    alert('chatController');
    console.log('chatController');
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
            socketServer.emit('message.add', $scope.newMessage);
            $scope.newMessage = ''
        }
    }

    //接收新消息
    socketServer.on('message.new', function (data) {
        $scope.messages.push(data);
    });

    $scope.$on('$destroy', function () {
        socketServer.clear();
    })
})