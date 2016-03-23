"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    //console.log("StateProvider:",$stateProvider);
    //console.log("urlRouterProvider:",$urlRouterProvider);

    $urlRouterProvider.otherwise("/loading");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "PokeDex",
        controller: "MainController",
        controllerAs: "main"
    }).state("detail",{
        url: "/detail",
        templateUrl: "app/components/PokeDetail/PokeDetail.html",
        title: "Pokedex Detail Page",
        controller: "PokeDetailController",
        controllerAs: "PokeDetail"
    }).state("map", {
        url: "/map",
        templateUrl: "app/components/PokeMap/main.html",
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
