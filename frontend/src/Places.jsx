import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';
import FavoritesButton from './FavoritesButton';
import ViewFavoritesPage from './Favorites';

export default function Places() {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        if(location.state.searchInput !== undefined) {
            setSearchInput(location.state.searchInput)
            }
        }, [location])
        // console.log("LOCATION STATE:", location.state)
    // console.log({searchInput});

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
            // Get first 3 results
            console.log("DATA:", data)
            const placeResults = data.results.slice(0, 3);
            // console.log(placeResults)
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
