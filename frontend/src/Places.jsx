import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';

export default function Places(props) {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (location.state?.searchInput !== undefined) {
            setSearchInput(location.state.searchInput);
        }
    }, [location]);
    // console.log("LOCATION STATE:", location.state)

    useEffect(() => {
        // check for user input in search bar, if not exit function
        if (searchInput === "") {
            return;
        }
        // encodes user input
        const encodedSearchInput = encodeURIComponent(searchInput);
        const fetchPlaces = async () => {
            try {
                // text search on flask backend
                const textSearchResponse = await fetch(`/api/places/textsearch?query=${encodedSearchInput}`);
                if (!textSearchResponse.ok) { //err handling
                    throw new Error('Network response error');
                }
                const textSearchData = await textSearchResponse.json();
                const places = textSearchData.results.slice(0, 6);

                // create new array of promises, each with fetch req fetching place details about places with corresponding place_id
                const placeDetailsPromises = places.map(async (place) => {
                    const google_place_id = place.place_id;
                    // place details on flask backend
                    const detailsResponse = await fetch(`/api/places/details?place_id=${google_place_id}`);
                    if (!detailsResponse.ok) { //err handling
                        throw new Error('Network response error');
                    }
                    const detailsData = await detailsResponse.json();
                    place.description = detailsData.result?.editorial_summary?.overview;
                    return place;
                });
                    // Promise.all() waits for all fetches to complete before returning, update setResults stat
                    const updatedPlaces = await Promise.all(placeDetailsPromises);
                    setResults(updatedPlaces);
                    } catch (error) {
                        console.error('Error fetching places:', error);
                    }
        };
        fetchPlaces();
    }, [searchInput]);

    return (
        <div>
            <MatchaList data={results} addPlacesFavButton={true}/>
        </div>
    )
}



    //     const fetchPlaces = async () => {
    //         try {
    //             const encodedSearchInput = encodeURIComponent(searchInput);
    //             const textSearchResponse = await fetch(`/api/places/textsearch?query=${encodedSearchInput}`);
    //             const textSearchData = await textSearchResponse.json();
    //             const places = textSearchData.results.slice(0, 6);
    //             const placeDetailsPromises = places.map(async (place) => {
    //                 const detailsResponse = await fetch(`/api/places/details?place_id=${place.place_id}`);
    //                 const detailsData = await detailsResponse.json();
    //                 place.description = detailsData.result?.editorial_summary?.overview;
    //                 return place;
    //             });
    //             const updatedPlaces = await Promise.all(placeDetailsPromises);
    //             setResults(updatedPlaces);
    //         } catch (error) {
    //             console.error('Error fetching places:', error);
    //         }
    //     };
    //     fetchPlaces();
    // }, [searchInput])

/************************************************************************/

    //     useEffect(() => {
    //         if (location.state?.searchInput !== undefined) {
    //             setSearchInput(location.state.searchInput);
    //         }
    //     }, [location]);

    //     useEffect(() => {
    //         if (searchInput === "") {
    //             return;
    //         }
    //         const encodedSearchInput = encodeURIComponent(searchInput);
    //         fetch(`/api/places/textsearch?query=${encodedSearchInput}`)
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 return response.json();
    //             })
    //             .then((textSearchData) => {
    //                 const places = textSearchData.results.slice(0, 6);

    //                 const placeDetailsPromises = places.map((place) => {
    //                     const google_place_id = place.place_id;

    //                     return fetch(`/api/places/details?place_id=${google_place_id}`)
    //                         .then((response) => {
    //                             if (!response.ok) {
    //                                 throw new Error('Network response was not ok');
    //                             }
    //                             return response.json();
    //                         })
    //                         .then((detailsData) => {
    //                             place.description = detailsData.result?.editorial_summary?.overview;
    //                             return place;
    //                         });
    //                 });
    //                 return Promise.all(placeDetailsPromises);
    //             })
    //             .then((updatedPlaces) => {
    //                 setResults(updatedPlaces);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching places:', error);
    //             });
    //     }, [searchInput]);
