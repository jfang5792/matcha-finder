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
        if(searchInput === "") {
            return
        }
        const encodedSearchInput = encodeURI(searchInput);
        // Make API call
        fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedSearchInput}&key=API_KEY`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const placeResults = data.results.slice(0, 3);

            placeResults.forEach(place => {
                const google_place_id = place.place_id
                fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${google_place_id}&key=API_KEY`)
                .then((res) => {
                    return res.json();
                }).then((data => {
                    place.description = data.result?.editorial_summary?.overview;
                }));
            });
            setResults(placeResults)
        })
    }, [searchInput])

    return (
        <div>
            <MatchaList data={results} addPlacesFavButton={true}/>
        </div>
    )
}

// import Card from 'react-bootstrap/Card';
// import { CardBody } from 'react-bootstrap';
// {/* <Card style={{ width: '18rem' }}>

//             <CardBody> */}
//             {/* <MatchaList data={data.results}/> */}
//             {/* </CardBody> */}
//             {/* <CardBody><MatchaList data={data.results}/></CardBody>
//             <CardBody><MatchaList data={data.results}/></CardBody> */}
//             {/* </Card> */}
