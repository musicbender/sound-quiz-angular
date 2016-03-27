var app = angular.module('myApp', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('data/quiz.json').then(function(response) {
        $scope.quiz = response.data;
    });
    $scope.quizNum = 0;
    $scope.audioNum = 0;
    $scope.score = 0;
}]);

app.controller('startCtrl', ['$scope', function($scope) {

}]);

app.controller('audioCtrl', ['$scope', function($scope) {

}]);

app.controller('scoreCtrl', ['$scope', function($scope) {

}]);

app.controller('answersCtrl', ['$scope', function($scope) {

}]);

app.directive('answers', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/answers.html'
    }
});

