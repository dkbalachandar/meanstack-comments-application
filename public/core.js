// public/core.js
var commentApp = angular.module('commentModule', []);

commentApp.controller('commentController', ['$scope', '$http', function($scope, $http) {

    $scope.formData = {};

    // when landing on the page, get all comments and show them
    $http({
        method: 'GET',
        url: '/api/comments/fetchAll'
    }).then(function success(response) {
        console.log(response.data);
        $scope.comments = response.data;
    }, function error(response) {
        console.log('Error: ' + response.data);
    });

    // when submitting the add form, send the text to the node API
    $scope.createComment = function() {
        var userName = $scope.formData.userName;
        var comment = $scope.formData.comment;

        if (userName != null && comment != null && userName.trim().length != 0 && comment.trim().length != 0) {
            $http({
                method: 'POST',
                data: $scope.formData,
                url: '/api/comments/save'
            }).then(function success(response) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.comments = response.data;
                console.log(response.data);
            }, function error(response) {
                console.log('Error: ' + response.data);
            });
        } else {
            alert("Either UserName or Comment is empty")
        }
    };

    // delete a comment after checking it
    $scope.deleteComment = function(id) {
        $http({
            method: 'DELETE',
            url: '/api/comments/delete/' + id
        }).then(function success(response) {
            console.log(response.data);
            $scope.comments = response.data;
        }, function error(response) {
            console.log('Error: ' + response.data);
        });
    };
}]);