"use strict";

angular.module("ngapp").controller("pokeMapController", function(SettingsMenu, shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;
    $scope.menu = SettingsMenu;
    $scope.closestPokemon = {};
    var watchID;

    $scope.map = {
        center: { latitude: shared.gpslocation.latitude, longitude: shared.gpslocation.longitude },
        zoom: 11,
        bounds: {}
    };

    $scope.Markers = [];

    var createMapMarkers = function() {
        var M = [];
        for(var i = 0; i < shared.pokemons.length; i++) {
            if(shared.pokemons[i].longitude != null && shared.pokemons[i].latitude != null) {
                var pointer = {};
                pointer.id = i;
                console.log(i + " - " + shared.pokemons[i].id);
                pointer.latitude = shared.pokemons[i].latitude;
                pointer.longitude = shared.pokemons[i].longitude;
                pointer.icon = shared.pokemons[i].sprites.front_default;
                M.push(pointer);
            }
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

    function onSuccess(acceleration) {

        if($scope.closestPokemon != null) {

            if(acceleration.x > 10 || acceleration.y > 10 || acceleration.z > 10) {
                shared.pokemons[$scope.closestPokemon.id - 1].latitude = null;
                shared.pokemons[$scope.closestPokemon.id - 1].longitude = null;

                for(var i = 0; i < $scope.Markers.length; i++) {
                    if(($scope.closestPokemon.id - 1) == $scope.Markers[i].id) {
                        $scope.Markers.splice(i, 1);
                        $scope.$apply();
                        shared.pokemons[$scope.closestPokemon.id - 1].caught = "OWNED";

                        alert("Jeuj je hebt de pokemon gevangen." + $scope.closestPokemon.name);
                        PokemonService.updatePokemon($scope.closestPokemon);
                        $scope.closestPokemon = null;
                        navigator.accelerometer.clearWatch(watchID);
                        watchID = null;
                        checkSurrounding();
                        return;
                    }
                }
            }
        }
    }

    function onError() {
        alert('onError!');
    }

    var options = { frequency: 1000 };  // Update every second

    var checkSurrounding = function() {
        var margin = 0.08;
        setTimeout(function() {
            for(var i = 0; i < shared.pokemons.length; i++) {
                var p = shared.pokemons[i];

                if(Math.abs(p.latitude - shared.gpslocation.latitude) < margin) {
                    if(Math.abs(p.longitude - shared.gpslocation.longitude) < margin) {

                        $scope.closestPokemon = shared.pokemons[i];
                        $scope.$apply();
                        if(navigator.accelerometer != null && watchID == null ) {
                            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
                        }
                        return;
                    }
                }
        }
            //stop watch
            if(watchID != null) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
            checkSurrounding();
        }, 2000);

    }


});
