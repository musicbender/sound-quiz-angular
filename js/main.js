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
}]);

app.controller('StartCtrl', ['quiz', function(quiz) {
    var vm = this;
    
    vm.quiz = quiz;
    vm.startQuiz = function() {
        vm.quiz.inProgress = true;
        console.log('TEST: start button clicked. ' + vm.quiz.inProgress);
    }

}]);

app.controller('ScoreCtrl', ['quiz', function(quiz) {
    var vm = this;
    vm.quiz = quiz;
}]);

app.controller('AudioCtrl', ['quiz', function(quiz) {
    var vm = this;
    
    vm.quiz = quiz;
}]);

app.controller('AnswersCtrl', ['quiz', function(quiz) {
    var vm = this;
    vm.quiz = quiz;
    vm.quizNum = quiz.quizNum;
    vm.checkAnswer = function(thisBox) {
        if (thisBox.correct) {
            vm.quiz.score++;
            console.log('Correct answer! Score: ' + vm.quiz.score);
        } else {
            console.log('Wrong Answer');
        }
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



