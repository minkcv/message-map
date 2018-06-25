var mymap = L.map('mapid').setView([39.721862, 255.007916], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(mymap);

var lastMarker;
var submitted = true;

function onMapClick(e) {
    if (!submitted)
    {
        lastMarker.remove();
    }
    submitted = false;
    //alert("You clicked the map at " + e.latlng);
    var marker = L.marker(e.latlng).addTo(mymap);
    lastMarker = marker;
    var markerHtml = `
        <form id='myForm' action='javascript:void(0);'>
        <input type="text" id='formText'></input>
        <input type="submit" value="Submit"></input>
        </form>
    `;
    marker.bindPopup(markerHtml).openPopup();
    document.getElementById('formText').focus();
    $('#myForm').submit(function(e) {
        submitted = true;
        e.preventDefault();
        $.ajax({
            url: '',
            type: 'post',
            data: $('#myForm').serialize(),
            success: function(){
                submitted = true;
            }
        });
        var resultMarkerHtml = document.getElementById('formText').value;
        marker.unbindPopup();
        marker.bindPopup(resultMarkerHtml).openPopup();
    });
    
}

mymap.on('click', onMapClick);

