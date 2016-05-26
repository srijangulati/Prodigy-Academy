var app = angular.module('mainApp', []);
app.controller('mainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    $scope.nextDiv = {
        "courses": "ourCourses",
        "batches": "ourBatches",
        "contact_us_btn": "contactUs",
        "contact": "contactUs",
        "gallery": "ourGallery",
        "goToGallery": "ourGallery"
    };

    var imageIds = [
        "image1",
        "image2",
        "image3",
        "image4",
        "image5",
        "image6",
    ];

    var currentImageId = 0;

    var showImage = function (id) {
        document.getElementById(imageIds[currentImageId]).style.height = "60px";
        document.getElementById(id).style.height = "600px";
        imageIds.forEach(function (imageId, index) {
            if (imageId == id) {
                currentImageId = index;
            }
        });
    };

    $scope.cources = [];
    $scope.batches = [];

    $scope.scrollToDiv = function ($event) {
        $event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#" + $scope.nextDiv[$event.target.id]).offset().top
        }, 1500);
    };

    $scope.zoomImage = function ($event) {
        showImage($event.target.id);
    };

    $scope.zoomImageClick = function ($event) {
        showImage($event.target.id);
    };

    $interval(function () {
        var id = (currentImageId + 1) % (imageIds.length);
        showImage(imageIds[id]);
    }, 2600);

    $http({
        method: 'GET',
        url: '/getCources'
    }).then(function successCallback(response) {
        $scope.cources = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: '/getBatches'
    }).then(function successCallback(response) {
        $scope.batches = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: '/getBatches'
    }).then(function successCallback(response) {
        $scope.batches = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });



}]);
app.controller('editCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.data = "welcome";
    $scope.cources = [];
    $scope.batches = [];

    $scope.addCource = function () {
        $scope.cources.push({
            name: "",
            about: ""
        });
    };

    $scope.subCource = function () {
        $scope.cources.pop();
    };

    $scope.addBatches = function () {
        $scope.batches.push({
            name: "",
            about: ""
        });
    };

    $scope.subBatches = function () {
        $scope.batches.pop();
    };

    $scope.putCources = function () {
        $http({
            method: 'POST',
            url: '/putCources',
            data: $scope.cources
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.putBatches = function () {
        $http({
            method: 'POST',
            url: '/putBatches',
            data: $scope.batches
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $http({
        method: 'GET',
        url: '/getCources'
    }).then(function successCallback(response) {
        $scope.cources = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });

    $http({
        method: 'GET',
        url: '/getBatches'
    }).then(function successCallback(response) {
        $scope.batches = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
}]);