function initMap() {
  console.log(myCampaing);
  var myLatLng = {lat: myCampaing.lat, lng: myCampaing.log};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
initMap();
