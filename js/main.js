(function(){  
    var app = angular.module('myApp', []);

    app.service('quiz', ['$http', function($http) {
        var serv = this;
        serv.quizData;
        $http.get('data/quiz.json').then(function(response) {
            serv.quizData = response.data;
        });
    }]);
    
    app.directive('answersSection', ['quiz', function(quiz) {
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
                    s.state = function() {
                        return quiz.quizData.data[s.quizNum];
                    }
                    console.log('TEST: start button clicked. ' + s.quizNum);
                }
                
                s.checkAnswer = function(thisBox) {
                    s.clicked = true;
                    s.nextSound();
                    if (thisBox.correct) {
                        s.score++;
                    } 
                    
                    console.log('TEST: checking answer...' + s.quizNum);
                }

                s.nextSound = function() {
                    s.quizNum++;
                    console.log('TEST: next quiz number: ' + s.getQuizNum());
                }
                
                s.getQuizNum = function() {
                    return s.quizNum;
                }
                
                s.getBox = function() {
                    return s.quiz.quizData.data[quizNum];
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

