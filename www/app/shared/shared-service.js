"use strict";

angular.module("ngapp").service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

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

angular.module("ngapp").service("PokemonService", function($resource){
    var url = 'http://pokeapi.co/api/v2/pokemon/?limit=20';
    
    return $resource(url);
});