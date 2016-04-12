(function(){  
    var app = angular.module('myApp', ['ngAnimate']);

    app.service('quiz', ['$http', function($http) {
        var serv = this;
        serv.quizData;
        $http.get('data/quiz.json').then(function(response) {
            serv.quizData = response.data;
        });
    }]);
    
    app.directive('quizSection', ['quiz', '$timeout', function(quiz, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'templates/quiz.html',
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
                    s.maxNum = quiz.quizData.data.length - 10;
                    s.state = function() {
                        return quiz.quizData.data[s.quizNum];
                    }
                }
                
                s.checkAnswer = function(thisBox) {
                    s.clicked = true;
                    s.correct = thisBox.correct;
                    
                    if (s.correct) { s.score++; } 
                    
                    $timeout(function() {
                        s.nextSound();
                    }, 1000);
                    
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
}());

