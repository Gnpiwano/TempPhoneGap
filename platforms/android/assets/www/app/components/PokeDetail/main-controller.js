"use strict";

angular.module("ngapp").controller("PokeDetailController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){
    
    $scope.pokemon = shared.currentPokemon;
    console.log($scope.pokemon);
    console.log($scope.pokemon.url);
    
    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    this.title = $state.current.title;

    $scope.init = function() {   
        
        $scope.pokemon = $resource($scope.pokemon.url).get();
        console.log("Resource" , $scope.pokemon);
    }
    
    $scope.initDetail = function(){
        console.log("current pokemon: "+$scope.currentPokemon)
    }
    
});

angular.module("ngapp").controller("listController", function($scope) {
    $scope.listTitle = "testingtitle";
});