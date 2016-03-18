"use strict";

angular.module("ngapp").service("shared", function($resource){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "Pokedex MD1",
        auth: window.localStorage['name'] || ''
    };

    this.pokemons = [];
    this.backgroundColor = "";
    this.currentPokemon = {};

});

angular.module("ngapp").service("dataService", function(){
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});

angular.module("ngapp").service("PokemonService", function($resource, shared){

    var pokemoncount = 40;
    var self = this;
    var count = 0;

    this.updatePokemons = function() {      //Haalt alle data op die op te halen is en slaat deze per pokemon op op het apparaat.
        console.log("UpdatePokemons ongoing");
        var url = 'http://pokeapi.co/api/v2/pokemon/';

        for(var i = 1; i <= pokemoncount; i++) {

            var resource = $resource( url + i + "/").get();

            resource.$promise.then(function(data) {
                var pokemon = {};
                pokemon.id = data.id;
                pokemon.name = data.name;
                pokemon.sprites = data.sprites;
                pokemon.abilities = data.abilities;
                pokemon.types = data.types;

                window.localStorage.setItem("pokemon_"+data.id , JSON.stringify(pokemon));
                count++;
                
                if(count == pokemoncount) {
                    var event = new CustomEvent("pokedex_ready");
                    document.dispatchEvent(event);
                }
            });
        }
    }

    this.getPokemonShortInfo = function() {
        var pokemons = [];
        for(var i = 1; i < pokemoncount; i++) {
            var resource = JSON.parse(window.localStorage.getItem("pokemon_"+i));
            pokemons.push(resource);
        }
        return pokemons;
    }

    this.getPokemon = function(id) {
        return JSON.parse(window.localStorage.getItem("pokemon_"+id));
    }

    this.checkForUpdates = function() {
        var today = new Date().getDay();

        //window.localStorage.removeItem("lastUpdatedDay");
        if(window.localStorage.getItem("lastUpdatedDay")) {
            var lastToday = window.localStorage.getItem("lastUpdatedDay");

            //if today > lastTody dan update behalve als today 0 is.
           if(today != lastToday && today > lastToday || today == 0) {
               console.log("1");
               self.updatePokemons();
               window.localStorage.setItem("lastUpdatedDay", today);
           } else {
                location.replace("#/main");
           }
        } else {
            console.log("3");
            window.localStorage.setItem("lastUpdatedDay", today);
            self.updatePokemons();
        }
    }

});

angular.module("ngapp").service("SettingsMenu", function(shared, $mdDialog, $mdSidenav, $mdComponentRegistry) {

    var ctrl = this;

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


    this.onSwipeRight = function(ev) {
        $mdSidenav("left").toggle();
    }


    this.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Your Name')
            .textContent(shared.name + ' is your current name')
            .placeholder('New name')
            .ariaLabel('name')
            .targetEvent(ev)
            .ok('Update')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function(result) {

            window.localStorage.setItem("name", result);
            shared.info.auth = result;
        }, function() {
            //TODO Cancel function
        });
    };
});