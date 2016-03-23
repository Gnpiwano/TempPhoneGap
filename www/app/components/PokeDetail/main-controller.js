"use strict";

angular.module("ngapp").controller("PokeDetailController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;

    alert("First alert test");
    $scope.init = function() {
        var tempPokemon = $resource("http://pokeapi.co/api/v2/pokemon/"+shared.currentPokemon.id+"/").get();
        alert("second alert test");

        document.addEventListener("backbutton", function (e) {
            alert("Test Go Back Button");
        }, false);

        tempPokemon.$promise.then(function(data) {
            $scope.pokemon = data;
            //console.log("Resource" , data);
        });
    }


    
});