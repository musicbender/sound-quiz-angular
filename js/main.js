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
                    console.log('TEST: start button clicked. ' + s.inProgress);
                    console.log('TEST: ' + s.quiz.quizData.data[0].box1.answer);
                }
                
                s.checkAnswer = function(thisBox) {
                    console.log('checking answer...');
                    s.clicked = true;
                    s.nextSound();
                    if (thisBox.correct) {
                        s.score++;
                    } 
                }

                s.nextSound = function() {
                    s.quizNum++;
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

