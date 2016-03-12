"use strict";

angular.module("ngapp").controller("MainController", function(shared, PokemonService ,$state, $scope, $mdSidenav, $mdComponentRegistry){

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
            console.log($scope.pokemons[0]);
        });
    }
    
    // $scope.initDetail = function(){
    //     console.log("current pokemon: "+$scope.currentPokemon)
    // }

    // $scope.showDetails = function(url){
    //     //dataService.set(url);
    //     console.log('setted: ' + JSON.stringify(url));
    //     window.location.href = "#showPokemon";
    // }

    this.isOpen = function() { return false };
    $mdComponentRegistry
    .when("left")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });

    this.toggleRight = function() {
    $mdSidenav("left").toggle()
        .then(function(){
        });
    };

    this.close = function() {
    $mdSidenav("right").close()
        .then(function(){
        });
    };
});

angular.module("ngapp").controller("listController", function($scope) {
    $scope.listTitle = "testingtitle";
});