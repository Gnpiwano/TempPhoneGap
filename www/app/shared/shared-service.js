"use strict";

angular.module("ngapp").service("shared", function($resource){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "Pokedex MD1",
        auth: window.localStorage['name'] || ''
    };

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

angular.module("ngapp").service("PokemonServiceV2", function($resource) {
    //var pokemoncount = 101;
    //
    //
    //
    //var db = openDatabase('pokeDexDb', '1.0', 'Pokedex pokemon database', 51000);
    //var self = this;
    //
    //this.updatePokemons = function() {
    //    var url = 'http://pokeapi.co/api/v2/pokemon/';
    //
    //    db.transaction(function(tx) {
    //        tx.executeSql('CREATE TABLE IF NOT EXISTS pokemon (id unique, text)');
    //        console.log("database Created");
    //
    //        for(var i = 1; i < pokemoncount; i++) {
    //
    //            var resource = $resource( url + i + "/").get();
    //            console.log("Resource captured " , resource);
    //
    //            resource.$promise.then(function(data) {
    //
    //                tx.executeSql('INSERT INTO pokemon (id, text) VALUES ('+data.id+','+JSON.stringify(data)+')');
    //                console.log("Inserted in database");
    //
    //                if(data.id == (pokemoncount - 1)) {
    //                    console.log("all pokemon Updated");
    //                }
    //            });
    //        }
    //
    //    })
    //}

    this.getPokemonShortInfo = function() {
        //var pokemons = [];
        //
        //db.transaction(function(tx) {
        //   tx.executeSql('SELECT * FROM pokemon', [], function (tx, results) {
        //       for(var i = 0; i < results.rows.length; i++) {
        //           pokemons.push(JSON.parse(results.rows.item(i).text));
        //       }
        //       console.log("done getPokemonShortInfo", pokemons);
        //   });
        //});
        //
        //return pokemons;
    }

    this.getPokemon = function(id) {

    }

    this.checkForUpdates = function() {

    }
});

angular.module("ngapp").service("PokemonService", function($resource){

    var pokemoncount = 20;
    var self = this;

    this.updatePokemons = function() {      //Haalt alle data op die op te halen is en slaat deze per pokemon op op het apparaat.
        console.log("UpdatePokemons ongoing");
        var url = 'http://pokeapi.co/api/v2/pokemon/';

        for(var i = 1; i < pokemoncount; i++) {

            var resource = $resource( url + i + "/").get();

            resource.$promise.then(function(data) {
                var pokemon = {};
                pokemon.id = data.id;
                pokemon.name = data.name;
                pokemon.sprites = data.sprites;
                pokemon.abilities = data.abilities;
                pokemon.types = data.types;

                window.localStorage.setItem("pokemon_"+data.id , JSON.stringify(pokemon));


                if(data.id == (pokemoncount - 1)) {
                    console.log("all pokemon Updated");
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
               self.updatePokemons();
               window.localStorage.setItem("lastUpdatedDay", today);
           }
        } else {
            window.localStorage.setItem("lastUpdatedDay", today);
            self.updatePokemons();
        }
    }

});