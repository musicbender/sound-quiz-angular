var app = angular.module('myApp', []);

app.service('quizService', ['$http', function($http) {
    var vm = this;

    $http.get('data/quiz.json').then(function(response) {
        vm.quiz = response.data;
    });
    vm.quizNum = 0;
    vm.audioNum = 0;
    vm.score = 0;
    vm.inProgress = false;
    vm.quizOver = false;
    vm.startQuiz = function () {
        vm.inProgress = true;
        console.log('TEST: start button clicked. ' + vm.inProgress);
    }

}]);

app.controller('MainCtrl', ['$http', 'quizService', function($http, quizService) {
    var vm = this;
    vm.inProgress = quizService.inProgress;

}]);

app.controller('StartCtrl', ['quizService', function(quizService) {
    var vm = this;
    vm.startQuiz = quizService.startQuiz;

}]);

app.controller('ScoreCtrl', [function() {

}]);

app.controller('AudioCtrl', [function() {

}]);

app.controller('AnswersCtrl', ['quizService', function(quizService) {
    var vm = this;
    vm.quiz = quizService.quiz;
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



