(function() {
  var gogeoUrl = 'http://maps.gogeo.io';
  var collectionName = 'people';

  var createCluster = function() {
    var cluster = new L.TileCluster(gogeoUrl + '/map/db1/' + collectionName + '/{z}/{x}/{y}/cluster.json?mapkey=123&cluster_qtd={cq}&callback={cb}',
      {
        useJsonP: true,
        calculateClusterQtd: function(zoom) {
          if (zoom >= 4) {
            return 2;
          } else {
            return 1;
          }
        }
      }
    );

    return cluster;
  };

  var createLayer = function() {
    // add your collection
<<<<<<< HEAD
    var tileLayer = L.tileLayer(gogeoUrl + '/map/db1/' + collectionName + '/{z}/{x}/{y}/tile.png?mapkey=123',
=======
    var tileLayer = L.tileLayer('http://maps.gogeo.io/map/db1/people/{z}/{x}/{y}/tile.png?mapkey=123',
>>>>>>> 92bfc4f2ca57fbaad517b83cc6771f54834d6f73
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

  map.setView([-16, -50], 9);

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
