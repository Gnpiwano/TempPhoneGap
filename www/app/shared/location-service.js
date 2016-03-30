angular.module("ngapp").service("location", function(){ // One of The Ways To Share Informations Across the Controllers

    var ctrl = this;
    this.gps = {
        latitude: 51.697816,
        longitude: 5.3036675
    }

    this.updateCurrentLocation = function() {

    };

    this.setLocation = function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                ctrl.gps.latitude = position.coords.latitude;
                ctrl.gps.longitude = position.coords.longitude;
            }, function(error) {
                console.log(error);
            })
        } else {

        }

    };

});
