// Working with csv files 
// Introducing Global variables
// Global variables are variables that you can use repeatedly
// zl is zoom level 
let map;
let lat = 0;
let lon = 0;
let zl = 1;
// global variables
let markers = L.featureGroup();

// path to csv data
let path = "data/minwage.csv";

// Introducing initialize
// When user hits your website and it loads, anything that goes inside "document.ready" is executed. For now, we have instructed 2 functions

// createMap is a function that is defined below 
$( document ).ready(function() {
    createMap(lat,lon,zl);
    // after creating Map, read CSV
    readCSV(path);
});

// create the map function
// lat, lon, zl were defined in global variables above 
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

function flyToIndex(lat, lon){
	map.flyTo([lat,lon],3)
};

// read csv data function 
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
            // spit it out onto the console 
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}
    // after data is read, it executes function using the data 
    // function mapCSV(data){
	
	// loop through each entry. because we're using papa parse data, we must name "data.data"
	    // data.data.forEach(function(item,index){
		// create marker
		// let marker = L.marker([item.latitude,item.longitude])

		// add marker to featuregroup
		//markers.addLayer(marker)
	// })

	// add featuregroup to map
	//markers.addTo(map)

	// fit markers to map so that it zooms out to all the points in your data
	//map.fitBounds(markers.getBounds())


    // alternatively, we can use circle markers and rewrite function mapCSV (data) as 
function mapCSV(data){
	
        // circle options
        let circleOptions = {
            radius: 5,
            weight: 1,
            color: 'black',
            fillColor: 'red',
            fillOpacity: 1
        }
    
        // loop through each entry
        data.data.forEach(function(item,index){
            // create marker
            let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)

            // Adding on a hover event (instead of onclick)
            //.on('mouseover',function(){
                this.bindPopup(`${item.title}<br>${item.minwage}</br>`).openPopup()
            
            //})
    
            // add marker to featuregroup		
            markers.addLayer(marker) 
         })
    
        // add featuregroup to map
        markers.addTo(map)
    
        // fit markers to map
        map.fitBounds(markers.getBounds())
     }