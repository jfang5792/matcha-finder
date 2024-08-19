import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';

export default function ViewFavoritesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [favs, setFavs] = useState([]);

    // const user =

    useEffect(() => {
        fetch(`/api/favorites`)
            .then((res) => { return res.json() })
            .then((data) => {
                // if(!favs) {
                //     return "No places added to Favorites yet!"
                // }
                setFavs(data)
            })
    }, []);
    // console.log("favs:", favs)

    // const placesAdded = favs.map((onePlaceAdded) => {
    //     return (
    //         <li key={onePlaceAdded.name}>
    //             {onePlaceAdded.name}
    //             <div>{onePlaceAdded.formatted_address}</div>
    //             <div>{onePlaceAdded.description}</div>
    //         </li>
    //     )
    // })

    return (
        <div>
            <h2>Places you've added to Favorites:</h2>
            <div>
                <MatchaList data={favs} addPlacesFavButton={false}/>
            </div>
        </div>
    )
}
