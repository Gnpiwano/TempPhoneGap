"use strict";

angular.module("ngapp").controller("loadingController", function(SettingsMenu, shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.loading_gif = "assets/pokeball.gif";
    $scope.menu = SettingsMenu;

    PokemonService.checkForUpdates();

    document.addEventListener("pokedex_ready", function(e) {
        location.replace("#/main");
    });

});