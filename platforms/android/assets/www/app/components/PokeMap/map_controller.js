"use strict";

angular.module("ngapp").controller("pokeMapController", function(SettingsMenu, shared,PokemonService,$resource,$state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    $scope.pokemon = shared.currentPokemon;
    $scope.menu = SettingsMenu;

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

    function onSuccess(heading) {
        console.log("Succes", heading);
    };

    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    };

    var options = {
        frequency: 3000
    }; // Update every 3 seconds

     $scope.compass = function() {
         var currentDegree = 0;

     }

    $scope.init = function() {
        createMapMarkers();

        if(navigator.compass != null) {
            navigator.compass.watchHeading(onSuccess, onError, options);
        }
    }


});
