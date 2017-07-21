function initMap() {
  console.log(myCampaing);
  for (var i=0; i<myCampaing.length; i++){
    var myLatLng = {lat: myCampaing[i].lat, lng: myCampaing[i].log};
    console.log(myLatLng);
    var map = [];
    map[i] = new google.maps.Map(document.getElementById('map' + i), {
      zoom: 19,
      center: myLatLng
    });
    var marker = [];
    marker[i] = new google.maps.Marker({
      position: myLatLng,
      map: map[i],
      title: 'Hello World!'
    });
  }

}
initMap();
