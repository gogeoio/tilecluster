(function() {
  var gogeoUrl = 'http://{s}.gogeo.io/1.0';
  var databaseName = 'db1';
  var collectionName = 'prospects';
  var key = '123';

  var createCluster = function() {
    var cluster = new L.TileCluster(gogeoUrl + '/map/' + databaseName + '/' + collectionName + '/{z}/{x}/{y}/cluster.json?mapkey=' + key + '&cluster_qtd={cq}',
      {
        useJsonP: false,
        calculateClusterQtd: function(zoom) {
          if (zoom >= 4) {
            return 1;
          } else {
            return 1;
          }
        },
        polygonOptsFunc: function(zoom, count) {
          var color = 'red';

          if (count < 100000) {
            color = 'yellow';
          }

          if (count < 50000) {
            color = 'blue';
          }

          return {
            color: color
          };
        },
        iconOpts: {
          iconUrl: '/example/marker.png',
          iconAnchor: [2, 2]
        }
      }
    );

    return cluster;
  };

  var createLayer = function() {
    // add your collection
    var tileLayer = L.tileLayer(gogeoUrl + '/map/' + databaseName + '/' + collectionName + '/{z}/{x}/{y}/tile.png?buffer=16&mapkey=' + key,
      {
        isBaseLayer: false
      }
    );
    return tileLayer;
  };

  var cluster = createCluster();
  var layer = null;

  var map = L.map('map', {
    layers: [ cluster ]
  });

  map.setView([-16, -50], 5);

  // add an OpenStreetMap tile layer
  var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  map.addLayer(baseLayer);

  map.on('zoomend',
    function(event) {
      var zoom = this.getZoom();

      if (zoom >= 13) {
        if (cluster) {
          map.removeLayer(cluster);
          cluster = null;
        }

        if (!layer) {
          layer = createLayer();
          map.addLayer(layer);
        }

      } else {
        if (layer) {
          map.removeLayer(layer);
          layer = null;
        }

        if (!cluster) {
          cluster = createCluster();
          map.addLayer(cluster);
        }
      }
    }
  );
})();