(function(){  
    var app = angular.module('myApp', ['ngAnimate']);

    app.service('quiz', ['$http', function($http) {
        var serv = this;
        serv.quizData;
        $http.get('data/quiz.json').then(function(response) {
            serv.quizData = response.data;
        });
    }]);
    
    app.directive('answersSection', ['quiz', '$timeout', function(quiz, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'templates/answers.html',
            replace: true,
            link: function(s, e, a) {
                s.quiz = quiz;
                s.inProgress = false;
                s.quizOver = false;
                s.clicked = false;
                
                s.startQuiz = function() {
                    s.inProgress = true;
                    s.quizNum = 0;
                    s.audioNum = 0;
                    s.score = 0;
                    s.maxNum = quiz.quizData.data.length - 1;
                    s.state = function() {
                        return quiz.quizData.data[s.quizNum];
                    }
                }
                
                s.checkAnswer = function(thisBox) {
                    console.log(s.maxNum);
                    s.clicked = true;
                    s.correct = thisBox.correct;
                    
                    if (s.correct) { s.score++; } 
                    
                    $timeout(function() {
                        s.nextSound();
                    }, 1600);
                    
                    if (s.quizNum >= s.maxNum) {
                        $timeout(function() {
                            s.quizOver = true;
                        }, 1600);
                    }
                }
                
                s.nextSound = function() {
                    if (s.quizNum < s.maxNum) { s.clicked = false; }
                    s.quizNum++;
                }
                
                s.getQuizNum = function() {
                    return s.quizNum;
                } 
            }
        }
    }]);

//    app.directive('startSection', function() {
//        return {
//            restrict: 'E',
//            templateUrl: 'templates/start.html',
//            replace: true
//        }
//    });
//    
//    app.directive('scoreSection', function() {
//        return {
//            restrict: 'E',
//            templateUrl: 'templates/score.html',
//            replace: true
//        }
//    });

//    app.directive('audioSection', function() {
//        return {
//            restrict: 'E',
//            templateUrl: 'templates/audio.html',
//            replace: true
//        }
//    });

    
}());

