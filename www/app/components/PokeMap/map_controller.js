"use strict";

angular.module("ngapp").controller("pokeMapController", function(SettingsMenu, shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;
    $scope.menu = SettingsMenu;

    $scope.compass = {
        data: 1
    };
    $scope.map = {
        center: { latitude: shared.gpslocation.latitude, longitude: shared.gpslocation.longitude },
        zoom: 11,
        bounds: {}
    };

    $scope.Markers = [];

    var createMapMarkers = function() {
        var M = [];
        for(var i = 0; i < shared.pokemons.length; i++) {
            var pointer = {};
            pointer.id = i;
            pointer.latitude = shared.pokemons[i].latitude;
            pointer.longitude = shared.pokemons[i].longitude;
            pointer.icon = shared.pokemons[i].sprites.front_default;
            M.push(pointer);
        }
        $scope.Markers = M;
    }

    var clickPokemon = function() {
        console.log("Jep you clicked a pokemon");
    }

    $scope.init = function() {
        createMapMarkers();
        checkSurrounding();

    }

    var checkSurrounding = function() {
        var margin = 0.0001;
        setTimeout(function() {
            for(var i = 0; i < shared.pokemons.length; i++) {
                var p = shared.pokemons[i];
                if(Math.max(p.latitude - shared.gpslocation.latitude) < margin) {
                    console.log("1");
                    if(Math.max(p.longitude - shared.gpslocation.longitude) < margin) {

                        //start een acceleration listener (stoppen zodra een callback gedaan wordt.
                        // als de pokemon nog steeds in de buurt is en er wordt hard genoeg gescht geef een melding dat de pokemon gevangen is. )

                        alert("IN DE BUURT" + shared.pokemons[i].name);
                        return;
                    }
                }
        }
            checkSurrounding();
        }, 5000);

    }


});
