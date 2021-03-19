
//Initialise map
//-------------------------------------------------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio (if youhave to work wit canvas)
var pixel_ratio = parseInt(window.devicePixelRatio) || 1;
// leaflet max zoom
var max_zoom = 16;
// Width and height of tiles (reduce number of tiles and increase tile size)
var tile_size = 512;
// zoom to italy (lat,lon, zoom)
var map = L.map('map', {
}).setView([0, 0],2);

// create the sidebar instance and add it to the map
var sidebar = L.control.sidebar({ container: 'sidebar' }).addTo(map);
// add panels dynamically to the sidebar

// open legend after a second!
setTimeout(function(){
sidebar.open('legend')
}, 1000);


// Define basemaps
// choose one from https://leaflet-extras.github.io/leaflet-providers/preview/
var WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
 attribution: ''
});

var light  =  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);


// Lable pane (no additional library required)
var topPane = map.createPane('leaflet-top-pane', map.getPanes().mapPane);
var topLayer =  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png', {
	subdomains: 'abcd',
  opacity: 1,
	maxZoom: 19
}).addTo(map);
topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(2);

var tmf = L.tileLayer.wms('https://ies-ows.jrc.ec.europa.eu/iforce/tmf_v1//wms.py', {
  layers: 'TransitionMap_Subtypes',
  transparent: true,
  format: 'image/png',
  opacity:'1',
  zIndex: 32
}).addTo(map);

 




//Available Layers
var baseMaps = {"White" : light, "WorldImagery":WorldImagery};


//Add Layer Control
layerControl = L.control.layers(baseMaps, overlayMaps, null,  {position: 'topleft'}).addTo(map);
