console.log('js is working')

const formSubmit = document.getElementById("search-bar-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("user-search-input").value;
  console.log(searchInput)

  // AJAX request to google places api with the search input added into the request payload
  fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=123%20main%20street&key={API_KEY}')
    .then((resp) => {
    return resp.json();
    // .then(res => res.json())
    // .then(res => res.places);
    })
})
