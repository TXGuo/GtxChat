angular.module('chatModule').factory('socketServer', function ($rootScope) {
    var socket = io.connect('http://' + window.location.host);
    return {
        on: function (eventName, callBack) {
            socket.on(eventName, function () {
                var arg = arguments;
                $rootScope.$apply(function () {
                    callBack.apply(socket, arg);
                });
            })
        },
        emit: function (eventName, message) {
            socket.emit(eventName, message);
        },
        clear: function () {
            socket.removeAllListeners();
        }
    }
})

angular.module('chatModule').directive('ctrlEnterBreakLine', function () {
    return {
        link: function (scope, element, attrs) {
            var ctrlDown = false;
            element.bind('keydown', function (event) {
                if (event.which == 17) {
                    ctrlDown = true;
                    setTimeout(function () {
                        ctrlDown = false;
                    }, 1000);
                }
                if (event.which == 13) {
                    if (ctrlDown) {
                        element.val(element.val() + '\n');
                    } else {
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    }
                    event.preventDefault();
                }
            });
        }
    }
})
