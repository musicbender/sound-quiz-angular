(function(){  
    var app = angular.module('myApp', []);

    app.service('quiz', ['$http', function($http) {
        var serv = this;
        serv.quizData;
        
        $http.get('data/quiz.json').then(function(response) {
            serv.quizData = response.data;
        });
    }]);

    app.controller('MainCtrl', ['$http', 'quiz', function($http, quiz) {
        var vm = this;
        
        vm.quiz = quiz;
        vm.quizNum = 0;
        vm.audioNum = 0;
        vm.score = 0;
        vm.inProgress = false;
        vm.quizOver = false;
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
                    console.log('checking answer...');
                    s.clicked = true;
                    s.nextSound();
                    if (thisBox.correct) {
                        s.quiz.score++;
                    } 
                }

                s.nextSound = function() {
                    s.quiz.quizNum++;
                }
            }
        }
    });
}());

