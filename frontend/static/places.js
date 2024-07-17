

function initPlace() {
    const place = new google.maps.Places(document.querySelector('#place'), {
        result: {

        }
    })
}

service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);
