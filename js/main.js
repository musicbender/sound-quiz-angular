var app = angular.module('myApp', []);

app.service('quiz', ['$http', function($http) {
    var vm = this;

    $http.get('data/quiz.json').then(function(response) {
        vm.quizData = response.data;
    });
    vm.quizNum = 0;
    vm.audioNum = 0;
    vm.score = 0;
    vm.inProgress = false;
    vm.quizOver = false;
    vm.startQuiz = function (progress) {
        vm.inProgress = true;
        console.log('TEST: start button clicked. ' + vm.inProgress);
    }

}]);

app.controller('MainCtrl', ['$http', 'quiz', function($http, quiz) {
    var vm = this;
    vm.quiz = quiz;


}]);

app.controller('StartCtrl', ['quiz', function(quiz) {
    var vm = this;
    vm.quiz = quiz;

}]);

app.controller('ScoreCtrl', [function() {

}]);

app.controller('AudioCtrl', [function() {

}]);

app.controller('AnswersCtrl', ['quiz', function(quiz) {
    var vm = this;
    vm.quizData = quiz.quizData;
    vm.checkAnswer = function() {
        console.log('TEST: clicked answer');
    }
}]);

app.directive('scoreSection', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/score.html'
    }
});

app.directive('audioSection', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/audio.html'
    }
});

app.directive('answersSection', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/answers.html'
    }
});



