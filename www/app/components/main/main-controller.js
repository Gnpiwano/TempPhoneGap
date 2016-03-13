"use strict";

angular.module("ngapp").controller("MainController", function(shared,PokemonService, $mdDialog, $resource, $state, $scope, $mdSidenav, $mdComponentRegistry, $location){

    var ctrl = this;

    $scope.name = shared.info.auth;
    
    this.toggle = angular.noop;

    this.title = $state.current.title;
    
    

    
    $scope.init = function() {   
         //hier ophalen
        //TODO: local storage met expire date
        
        PokemonService.get(function(data,err){
            $scope.pokemons = data.results;
            shared.pokemon = $scope.currentPokemon;
        });
        
        var abc = $resource('http://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=20');
        console.log("Resource" , abc.get());
    }
    
    $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
          .title('Your Name')
          .textContent($scope.name + ' is your old name')
          .placeholder('New name')
          .ariaLabel('name')
          .targetEvent(ev)
          .ok('Update')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function(result) {
            window.localStorage['name'] = result;
            $scope.name = result;
        }, function() {
            //TODO Cancel function
        });
    };

    $scope.initDetail = function(){
        //console.log("current pokemon: "+$scope.currentPokemon)
    }
    
    $scope.go = function(pokemon) {
        var pokemon = this.pokemon;
        shared.currentPokemon = pokemon;   
        location.replace("#/detail");
    }
    
    $scope.getData = function(url) {
        var url = 'http://pokeapi.co/api/v2/pokemon/?limit=20';
        return $resource(url);
    }

    $scope.showDetails = function(url){
        //dataService.set(url);
        //console.log('setted: ' + JSON.stringify(url));
        window.location.href = "#showPokemon";
    }

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