"use strict";

angular.module("ngapp").controller("PokeDetailController", function(shared,PokemonService,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){
    
    $scope.pokemon = shared.currentPokemon;
    console.log($scope.pokemon.url);
    
    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    this.title = $state.current.title;

    $scope.init = function() {   
         //hier ophalen
        //TODO: local storage met expire date
        PokemonService.get(function(data,err){
            $scope.pokemons = data.results;
            $scope.currentPokemon = $scope.pokemons[0];
            shared.pokemon = $scope.currentPokemon;
        });
    }
    
    $scope.initDetail = function(){
        console.log("current pokemon: "+$scope.currentPokemon)
    }
    
});

angular.module("ngapp").controller("listController", function($scope) {
    $scope.listTitle = "testingtitle";
});