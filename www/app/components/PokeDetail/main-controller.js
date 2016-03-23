"use strict";

angular.module("ngapp").controller("PokeDetailController", function(shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;

    $scope.init = function() {
        var tempPokemon = $resource("http://pokeapi.co/api/v2/pokemon/"+shared.currentPokemon.id+"/").get();

        tempPokemon.$promise.then(function(data) {
            $scope.pokemon = data;
            //console.log("Resource" , data);
            document.addEventListener("backbutton", function (e) {
                alert("Test Go Back Button");

                //if($state.is('detail')){
                //  location.replace("#/main");
                //}  else{
                //  e.preventDefault();
                //}

            }, false);
        });
    }


    
});