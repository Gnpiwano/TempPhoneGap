"use strict";

angular.module("ngapp").controller("loadingController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.loading_gif = "assets/pokeball.gif";
 
    PokemonService.checkForUpdates();
    
    document.addEventListener("pokedex_ready", function(e) {
        location.replace("#/main");
    });
    
});