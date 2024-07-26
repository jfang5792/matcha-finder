// const { urlencoded } = require("express");

console.log('js is working')

const formSubmit = document.getElementById("search-bar-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("user-search-input").value;
  const encodedSearchInput = encodeURI(searchInput)

  // AJAX request to google places api with the search input added into the request payload
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedSearchInput}&key={API_KEY}`)
    .then((res) => {return res.json()})
    .then((data) => {
      console.log({data});
      const resultNode = document.getElementById("search-results-list");
      const results = data.results;
      console.log({results});

      results.slice(0, 3).forEach(result => {
          const liElement= document.createElement("li");
          liElement.className = "result-item";
          liElement.innerHTML = `
              ${result.name}
              <p>${result.formatted_address}</p>
              <p><button type="button" class="favorite-button" id=${result.place_id}> Add to Favorite </button></p>
          `;
          resultNode.appendChild(liElement);
      })

    document.querySelector(".favorite-button").addEventListener("submit", (evt) => {

    })

    })
    // .catch((error) => {console.log("No results found, try again")})
})
