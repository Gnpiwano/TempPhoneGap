"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/loading");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Cordova Angular-Material",
        controller: "MainController",
        controllerAs: "main"
    }).state("detail",{
        url: "/detail",
        templateUrl: "app/components/pokeDetail/main.html",
        title: "Pokedex Detail Page",
        controller: "PokeDetailController",
        controllerAs: "PokeDetail"
    }).state("map", {
        url: "/map",
        templateUrl: "app/components/pokeMap/main.html",
        title: "Pokedex Detail Page",
        controller: "pokeMapController",
        controllerAs: "main"
    }).state("loading", {
        url: "/loading",
        templateUrl: "app/components/loadingScreen/main.html",
        title: "Loading pokedex",
        controller: "loadingController",
        controllerAs: "main"
    });

}]);
