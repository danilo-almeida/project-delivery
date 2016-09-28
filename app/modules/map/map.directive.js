app.directive('movmovitMap', function ($templateRequest, $sce, $compile, myConfig, $rootScope, mapBoxMovmovit) {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: true,
        template: '<div id="wrapper-map"></div>',
        link: function($scope, $element){
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGFuaWxvYWxtZWlkYSIsImEiOiJjaWZmbWVhN3M4bWx4c2VtNzlmNHB2eXg2In0.QhzG74ZBUX45XmYoYdnVKQ';
        
            var map = L.mapbox.map('wrapper-map', 'mapbox.streets', {
                doubleClickZoom: false
            });
            map.setView([-23.54644, -46.65806], 16);
            //map.locate({setView: true, maxZoom: 16});
            map.on('dblclick', function (e) {
                map.setView(e.latlng, map.getZoom() + 1);
            });
            map.locate();
            //Pode ser um service depois
            var geoJson = [
                // origem do pedido
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-46.6586, -23.54372]
                    },
                    properties: {
                        showDriverDetails: false,
                        title: 'Restaurante',
                        "icon": {   
                            "iconUrl": "imgs/markers/marker-me.png",
                            "iconSize": [40, 40],
                            "iconAnchor": [20, 20],
                            "popupAnchor": [0, -20]
                        }
                    }
                },
                // motoboys ocupados
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-46.65801, -23.54647]
                    },
                    properties: {
                        showDriverDetails: false,
                        title: 'Ocupado',
                        "icon": {
                            "iconUrl": "imgs/markers/marker-driver-busy.png",
                            "iconSize": [40, 40],
                            "iconAnchor": [20, 20],
                            "popupAnchor": [0, -20]
                        }
                    }
                },
                // motoboys livres
                //-23.54533, -46.65755
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-46.66171, -23.54495]
                    },
                    properties: {
                        showDriverDetails: true,
                        "icon": {
                            "iconUrl": "imgs/markers/marker-driver-free.png",
                            "iconSize": [40, 40],
                            "iconAnchor": [20, 20],
                            "popupAnchor": [0, -20]
                        }
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [ -46.65755, -23.54533]
                    },
                    properties: {
                        showDriverDetails: true,
                        "icon": {
                            "iconUrl": "imgs/markers/marker-driver-free.png",
                            "iconSize": [40, 40],
                            "iconAnchor": [20, 20],
                            "popupAnchor": [0, -20]
                        }
                    }
                }
            ];


            //make map
            var markersObj = L.mapbox.featureLayer({
                type: 'FeatureCollection',
                features: geoJson
            }).addTo(map);

            //centralizar quando clica no marcador
            map.featureLayer.on('click', function (e) {
                map.panTo(e.layer.getLatLng());
            });

            //// adiciona os marcadores
            markersObj.on('layeradd', function (e) {
                var marker = e.layer,
                    feature = marker.feature;
                marker.setIcon(L.icon(feature.properties.icon));
            });

            markersObj.on('mouseover', function (e) {
                if (e.layer.feature.properties.title) {
                    e.layer.openPopup();
                }
            });

            markersObj.on('mouseout', function (e) {
                if (e.layer.feature.properties.title) {
                    e.layer.closePopup();
                }
            });

            markersObj.on('click', function (e) {
                if (e.layer.feature.properties.showDriverDetails) {
                    drawRoute(e.layer.feature.geometry.coordinates);
                }
            });
            markersObj.setGeoJSON(geoJson);
            var waypoints = [];
            var polyline_options = {
                color: '#249BAC',      // Stroke color
                opacity: 0.6,         // Stroke opacity
                weight: 5,         // Stroke weight
            };

            var polyline = L.polyline([], polyline_options).addTo(map);
            function drawRoute(coords) {
                var points = coords + ';-46.65801,-23.54647;-46.6586,-23.54372';
                var directionsUrl = 'http://api.tiles.mapbox.com/v4/directions/mapbox.driving/' +
                points + '.json?access_token=' + L.mapbox.accessToken;
                $.get(directionsUrl, function(data) {
                    var route = data.routes[0].geometry.coordinates;
                    route = route.map(function(point) {
                        return [point[1], point[0]];
                    });
                    polyline.setLatLngs(route);
                });
            }

            /**
             * Carrega o HTML driver-details.html que é o modelo de tooltip
             * para chamar o motoboy
             */
            var dirDriverDetails = $sce.getTrustedResourceUrl(myConfig.paths.modules + 'map/driver-details.html');
            $templateRequest(dirDriverDetails).then(function (template) {
                    var content = $compile(template)($scope.$parent); 
                    markersObj.eachLayer(function (layer) {
                        if (layer.feature.properties.showDriverDetails == true) {
                            layer.bindPopup(content[0]);
                        }
                    }); 
                }
            );
        }
    }
});