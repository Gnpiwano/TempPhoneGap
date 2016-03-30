"use strict";

angular.module("ngapp").controller("MainController", function(SettingsMenu, shared,PokemonService, $mdDialog,$cordovaSQLite,$resource, $state, $scope, $mdSidenav, $mdComponentRegistry, $timeout, $location){

    $scope.name = shared.info.auth;
    $scope.menu = SettingsMenu;
    $scope.shared = shared;


    this.toggle = angular.noop;

    this.title = $state.current.title;

    $scope.init = function() {

        //$scope.pokemons = shared.pokemons;
        //PokemonService.checkForUpdates();
        $scope.pokemons = PokemonService.getPokemonShortInfo();
        console.log($scope.pokemons);
        shared.setLocation();

    }

    $scope.goDetail = function(pokemon) {
        var pokemon = this.pokemon;
        shared.currentPokemon = pokemon;
        location.replace("#/detail");
    }

    $scope.goMap = function() {
        //location.replace("#/loading");
        location.replace("#/map");
    }

});
