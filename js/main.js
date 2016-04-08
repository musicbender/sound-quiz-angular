(function(){  
    var app = angular.module('myApp', []);

    app.service('quiz', ['$http', function($http) {
        var serv = this;

        serv.quizNum = 0;
        serv.audioNum = 0;
        serv.score = 0;
        serv.inProgress = false;
        serv.quizOver = false;
        serv.quizData;
        serv.box;

        $http.get('data/quiz.json').then(function(response) {
            serv.quizData = response.data;
            serv.box = serv.quizData.data[serv.quizNum];
        });
    }]);

    app.controller('MainCtrl', ['$http', 'quiz', function($http, quiz) {
        var vm = this;

        vm.quiz = quiz;
        vm.clicked = false;
        vm.startQuiz = function() {
            vm.quiz.inProgress = true;
            console.log('TEST: start button clicked. ' + vm.quiz.inProgress);
        }

    }]);

    app.directive('startSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/start.html',
            replace: true
        }
    });
    
    app.directive('scoreSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/score.html',
            replace: true
        }
    });

    app.directive('audioSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/audio.html',
            replace: true
        }
    });

    app.directive('answersSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/answers.html',
            replace: true,
            link: function(s, e, a) {
                s.checkAnswer = function(thisBox) {
                    s.clicked = true;
                    s.nextSound();
                    if (thisBox.correct) {
                        vm.quiz.score++;
                    } 
                }

                vm.nextSound = function() {
                    vm.quiz.quizNum++;
                }
            }
        }
    });
}());

