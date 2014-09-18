# Leaflet.tilecluster

Provides the cluster service by tile map, much like the plugin [utfgrid](https://github.com/danzel/Leaflet.utfgrid) and visually similar to the [markercluster](https://github.com/Leaflet/Leaflet.markercluster).

## Using the plugin

Create a new TileCluster.

```
var cluster = new L.TileCluster('http://maps.gogeo.io/map/db1/people/{z}/{x}/{y}/cluster.json?cluster_qtd={cq}');

map.addLayer(cluster);
```

?callback={cb} is required when using cluster in JSONP mode.

```
var cluster = new L.TileCluster('http://maps.gogeo.io/map/db1/people/{z}/{x}/{y}/cluster.json?callback={cb}&cluster_qtd={cq}',
  {
    useJsonP: true
  }
);

map.addLayer(cluster);
```

?cluster_qtd={cq} is the amount of clusters to be created for each tile (default is 1 cluster per tile). You can use your own function based on zoom:

```
var cluster = new L.TileCluster('http://maps.gogeo.io/map/db1/people/{z}/{x}/{y}/cluster.json?callback={cb}&cluster_qtd={cq}',
  {
    {
      useJsonP: true,
      calculateClusterQtd: function(zoom) {
        if (zoom >= 8) {
          return 2;
        } else {
          return 1;
        }
      }
    }
  );
```

### Live example

http://demos.gogeo.io/geo-aggregation

### License

Leaflet.tilecluster is free software, and may be redistributed under the MIT-LICENSE.
