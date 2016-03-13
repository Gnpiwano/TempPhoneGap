"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    //console.log("StateProvider:",$stateProvider);
    //console.log("urlRouterProvider:",$urlRouterProvider);
    
    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Cordova Angular-Material",
        controller: "MainController",
        controllerAs: "main"
    }).state("detail",{
        url: "/detail",
        templateUrl: "app/components/PokeDetail/PokeDetail.html",
        title: "Cordova Angular-Material",
        controller: "PokeDetailController",
        controllerAs: "PokeDetail"
    });

}]);
