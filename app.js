var app = angular.module('app', []);

app.controller('mainCtrl',['$scope',function($scope){
    
}]);

var map = ['$window',function($window){
    
    var template = '<p><span id="status">Looking up your geo-location...</span></p>' +
                    '<br><div id="map"></div>',
        status =null,
        container =null;
    
    function link(scope, elem, attrs){
        status = angular.element(document.getElementById('status'));
        container = angular.element(document.getElementById('map'));
        
        container.attr('style','height:'+scope.height+'px;width:'+scope.width+'px');
        
        $window.navigator.geolocation.getCurrentPosition(mapLocation, geoError);
    }
    
    function mapLocation(pos){
        status.html('Found your location !!  Longitude:'+pos.coords.longitude+'Latitude:'+pos.coords.latitude);
        
        var latLang = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        var options = {
            zoom:14,
            center:latLang,
            mapTypeControl:true,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(container[0],options);
        
        var marker = new google.maps.Marker({
            position:latLang,
            map:map,
            title:'your location'
        })
    }
    
    function geoError(error){
        status.html('Failed to locate you :'+error.message);
    }
    
    
    return {
        scope:{
          height : '@',
          width : '@'        
        },
        template : template,
        link : link
    }
}];
    
    
app.directive('googleMap',map);