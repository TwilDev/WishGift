//setup click event for page show

$(document).on("pageshow","#viewWishlistLocation", onPageShow);

function onPageShow() {
    
    //empty page
    $('#wishlistMap').empty();
    
    //parse information from local storage
    var get = JSON.parse(localStorage.getItem("wishlistSelectedItem"));
    
    //set lat and long values
    var lat = get.lat;
    
    var long = get.long;
    
    //If no values are found
    if (!lat || !long) {
        
        //append error message 
        $('#wishlistMap').append("<p class='no-map'>No Location was found for this item</p>");
        //do not attempt to draw map
        return false;
    }
    
    //define access token to MapAPI
    var mapboxAccessToken = "pk.eyJ1IjoiZ29sYTEiLCJhIjoiY2tuZWtwZ3V5MDU3azJ5bWU0NHNvbXE5eCJ9.2UF5Fa4kWPEzV-W4dZzhJA";
    
    
    //Define map via Div ID
    var myMap = L.map('wishlistMap').setView([lat, long], 13);
    
    //Create map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ29sYTEiLCJhIjoiY2tuZWtwZ3V5MDU3azJ5bWU0NHNvbXE5eCJ9.2UF5Fa4kWPEzV-W4dZzhJA'
    }).addTo(myMap);
    
    //Add marker to map with the lat and long values
    L.marker([lat, long]).addTo(myMap);
    

}