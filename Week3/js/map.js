    // let's create some data. make sure to add index ('id'=0,1,2,etc) so that we can activate the FlyTo function 
    let data = [
        {
            'id':0,
            'title':'Phuket',
            'country':'Thailand',
			'lat': 7.8804,
			'lon': 98.3923,
			'descrip': 'I spent Summer 2018 with my high school friends here island hopping, enjoying the vibrant night life and amazing food of Thailand.',
			'img':'phuket.jpg'
			
		},
		{
			'id':1,
            'title':'Siem Reap',
            'country':'Cambodia',
			'lat': 13.3633,
			'lon': 103.8564,
			'descrip': 'I spent Winter 2017 with my high school friends here executing a community service project. We also got to enjoy the vibrant night life, ride a boat across the Tonle Sap and of course, marvel at the Angkor Wat Temple.',
			'img':'cambodia.jpg'
		
		},
		{
			'id':2,
            'title':'Krabi',
            'country':'Thailand',
			'lat': 8.0863,
			'lon': 98.9063,
			'descrip': 'I spent Winter 2016 here with my family island-hopping, eating crispy omelettes, sipping refreshing mango shakes and ATV-riding in the mud.',
			'img':'krabi.JPG'
		},
		{
			'id':3,
            'title':'Singapore',
            'country':'Singapore',
			'lat': 1.3521,
			'lon': 103.8198,
			'descrip':'I only spent one night here but loved the airport, shopping and cleanliness of Singapore. I want to return!',
			'img':'singapore.jpg'
		},
		{
			'id':4,
            'title':'Jakarta',
			'lat': -6.2088,
			'lon': 106.8456,
			'descrip':'I spent Winter 2018 here with my family shopping for traditional clothing and amazing food. I tasted cow brain in Jakarta.',
			'img':'jakarta.png'
		},
    ]

   // dream destinations - a separate layer
    let dream = [
        {
            'id':0,
            'title':'Bario',
			'lat': 3.735,
			'lon': 115.4793,
			'descrip': 'The home of the indigenous Kelabit people',
			
		},
        {
            'id':1,
            'title':'Pulau Pinang',
			'lat': 5.4141,
			'lon': 100.3288,
			'descrip': 'One of the busiest islands in Malaysia, especially famous for its amazing food',
			
		},
        {
            'id':2,
            'title':'Taman  Negara',
            'lat': 4.6360,
            'lon': 102.4069,
            'descrip': 'One of Malaysias only national parks, it has tapirs!'
      
        },
    ]

    let map = L.map('map').setView([4.2105,101.9758], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // before looping through data, create an empty FeatureGroup. Leaflet's featureGroup needs to be added to create a layer on the map that we can toggle on or off.  

    let myMarkers = L.featureGroup();
    let myMarkers2 = L.featureGroup();

    // loop through data 
    // create marker
    data.forEach(function(item){
        let marker = L.marker([item.lat,item.lon]
            // map marker icons
               // {icon: new L.Icon({
                //iconUrl: `./countryflags/${item.title}.png`,
                //iconSize: [50, 30],
                //iconAnchor: [10, 0],
                )
            .addTo(map)
            .bindPopup(`<div><strong>${item.title}</strong><br>
            <img class = '.pic' src=${item.img} width='200' height='200'/><br>${item.descrip}</div>`, {maxHeight:'100px'})
        
            //add marker to featuregroup
        myMarkers.addLayer(marker)

            // add data to sidebar with onclick event
        $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
        // using loop + jquery to first ADD TEXT to sidebar. to know what 'append' does, try $('.header').append('Goodbye!') and you will see the word 'Goodbye' at the end of your header!
	         // $('.sidebar').append(item.title)

        // using loop + jquery + wrapping content in div container, that is, mixing HTML (sidebar-item) + adding a class attribute so that we can style it later 
        // add data to sidebar
    	    // $('.sidebar').append('<div class="sidebar-item">'+item.title+'</ div>') 
            // alternatively 
        // add data to sidebar before the loop ends. remember that when adding HTML, we must use '<>'
            // additionally, let's introduce 'Template literals'! where we can use less + signs, with the use of the diagonal apostrophe on the top left of your keyboard : `. instead of $('.sidebar).append('<div class="sidebar-item">'+item.title+'</div>), we can use `.  to call variable item.title using ${} 
  // $('.sidebar').append(`<div class="sidebar-item">${item.title}</div>`)

        // jquery onclick alert box. first test it out using 
        // $('.sidebar').append(`<div class="sidebar-item" onclick="alert('you clicked ${item.title}!')">${item.title}</div>`) 
    
    })

    dream.forEach(function(item){
        let marker=L.marker([item.lat,item.lon]).addTo(map)
            .bindPopup(`<div><strong>${item.title}</strong><br>${item.descrip}</div>`)

            //add marker to featuregroup
        myMarkers2.addLayer(marker)

    })

    //after loop, add the FeatureGroup to map 
myMarkers.addTo(map)

    //after loop, add the FeatureGroup to map 
myMarkers2.addTo(map)

    // define layers, so we can give users the option to toggle or not
let layers={
    "Where I've Been": myMarkers,
    "Where to Next": myMarkers2

};

    // add layer control box
L.control.layers(null,layers).addTo(map)

    // zoom out to extent of markers
map.fitBounds(myMarkers.getBounds())


    // function to fly to a location by a given id number
function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)

    //open the popup
    myMarkers.getLayers()[index].openPopup()
}


    // activate this function as on onclick event from the sidebar. To do so, add the event to the code that generates the div in the sidebar.
    
    //loop through data
   // data.forEach(function(item,index){
        // add marker to map
        //  L.marker([item.lat,item.lon]).addTo(map)
        //    .bindPopup(item.title)

        // add data to sidebar with onclick event
        //  $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`) })
   

    