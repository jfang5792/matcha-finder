import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';

export default function Places(props) {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if(location.state.searchInput !== undefined) {
            setSearchInput(location.state.searchInput)
            }
        }, [location])
        // console.log("LOCATION STATE:", location.state)

    useEffect(() => {
        // check for user input in search bar, if not exit function
        if(searchInput === "") {
            return
        }
        // encodes user input in api key
        const encodedSearchInput = encodeURI(searchInput);
        // make Google Places Text Search API call using encoded user input
        const textSearchPromise = fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedSearchInput}&key=API_KEY`)
        .then((res) => {
            return res.json()
        })
        const places = [];
        textSearchPromise.then(data => {
            places.push(...data.results.slice(0, 6))
            // create new array of promises, each with fetch req fetching more details about places with their place_id
            const placeDetailsPromises = places.map(place => {
                const google_place_id = place.place_id;
                // make API call for text summary via place_id
                return fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${google_place_id}&key=API_KEY`)
                .then((res) => {
                    return res.json();
                }).then((data => {
                    place.description = data.result?.editorial_summary?.overview;
                }));
            });
            // Promise.all() waits for all fetches to complete before returning, update setResults state
            Promise.all(placeDetailsPromises)
            .then(() => {
                setResults(places);
            })
        })
    }, [searchInput])

    return (
        <div>
            <MatchaList data={results} addPlacesFavButton={true}/>
        </div>
    )
}
