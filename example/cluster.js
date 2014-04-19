(function() {
  var collectionName = '1m_empresas';

  var createCluster = function() {
    var cluster = new L.TileCluster('http://192.168.88.143:9090/map/db1/' + collectionName + '/{z}/{x}/{y}/cluster.json?mapkey=123&cluster_qtd={cq}',
      {
        useJsonP: false,
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
    var tileLayer = L.tileLayer('http://192.168.88.143:9090/map/db1/' + collectionName + '/{z}/{x}/{y}/tile.png?mapkey=123',
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

      if (zoom >= 10) {
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