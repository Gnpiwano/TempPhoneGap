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

    function onSuccess(acceleration) {
        alert('Acceleration X: ' + acceleration.x + '\n' +
            'Acceleration Y: ' + acceleration.y + '\n' +
            'Acceleration Z: ' + acceleration.z + '\n' +
            'Timestamp: '      + acceleration.timestamp + '\n');
    }

    function onError() {
        alert('onError!');
    }


    $scope.init = function() {
        setTimeout(function(){
            navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
        }, 1000);

    }



});
