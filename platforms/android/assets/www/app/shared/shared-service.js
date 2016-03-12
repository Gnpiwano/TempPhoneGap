"use strict";

angular.module("ngapp").service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "cordova-angular-angularMaterial-seed",
        auth: "Mario Aleo"
    };
});

angular.factory('dataService', function() {
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

angular.factory('PokemonService', function ($resource) {

    //
    var data
    return $resource('http://pokeapi.co/api/v2/pokemon/:id/?limit=20');
});