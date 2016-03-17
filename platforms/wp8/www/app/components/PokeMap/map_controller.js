"use strict";

angular.module("ngapp").controller("pokeMapController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;
    $scope.map = "testing pagina";

    $scope.init = function() {

    }
    
});