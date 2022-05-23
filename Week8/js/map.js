// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = '';
let markers = L.featureGroup();

// put this in your global variables
let json_data;
let json_layer;


// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	getJSON();

});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to get the json data
function getJSON(){
	$.getJSON('https://data.lacity.org/resource/2nrs-mtv8.json?$order=date_rptd%20desc',function(data){
		console.log(data)
// globalize data so we don't have to pass to each other
		json_data = data;
		mapJSON()
	})
}


// function to map the file
function mapJSON(){

	// clear layers
	markers.clearLayers();
    
    // loop through each entry
	json_data.forEach(function(item,index){
		if(item.lat != undefined){
			// circle options
			let circleOptions = {
				//radius: getRadiusSize(item[race]),
				weight: 1,
				color: 'white',
				fillColor: 'red',
				fillOpacity: 0.5
			}
			let marker = L.circleMarker([item.lat,item.lon],circleOptions)
			.on('mouseover',function(){
				//change this this.bindPopup(`${item['Country/Region']}<br>Total confirmed cases as of ${race}: ${item[vict_desc]}`).openPopup()
			})
			markers.addLayer(marker)	
		}
    
});
markers.addTo(map)
	map.fitBounds(markers.getBounds())

}

function getRadiusSize(value){

    // create empty array to store data
	let values = [];

	// add case counts for most recent date to the array
	json_data.forEach(function(item,index){
		if(item[race] != undefined){
			values.push(Number(item[race]))
		}
	})
    
    // get the max case count for most recent date
	let max = Math.max(...values)
	
	// per pixel if 100 pixel is the max range
	perpixel = max/100;

    // return the pixel size for given value
	return value/perpixel
}
