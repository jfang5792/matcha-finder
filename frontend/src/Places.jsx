import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Places() {
    const location = useLocation();
    const [results, setResults] = useState([]);
    useEffect(() => {
        setResults(location.state);
    }, [location])

    console.log({results});

    // const navigate = useNavigate();
    // const viewPlaces = (evt) => {
    //     evt.preventDefault()
    //     fetch(`/api/favorites`, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             place_id: evt.target.id
    //         }),
    //         headers: {"Content-Type": "application/json"},
    //     })
    //     .then((res) => {return res.json()})
    //     .then((data) => {

    // })


    // const viewEachPlace = (evt) => {

    // }

    // }

    return (
        <div>
            <h1>List of Matcha spots:</h1>
            <div>
                {results}

            </div>
        </div>
    )
}
