"use strict";

angular.module("ngapp").controller("pokeMapController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;
    $scope.map = { center: { latitude: 51.697816, longitude: 5.303675 }, zoom: 13 };

    // $scope.map.then(function(maps) {
    //   //Hier alle pokemon tonene.   
    // })
    
    $scope.init = function() {

    }
    
});