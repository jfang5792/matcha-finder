import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';
import RatingStar from './Ratings';

export default function ViewFavoritesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        fetch(`/api/favorites`)
            .then((res) => { return res.json() })
            .then((data) => {
                // if(!favs) {
                //     navigate('/favorites')
                // return "No places added to Favorites yet!"
                // }
                setFavs(data)
            })
    }, []);
    // console.log("favs:", favs)

    const placesAdded = favs.map((onePlaceAdded) => {
        return (
            <div>
                <li key={onePlaceAdded.name}>
                    {onePlaceAdded.name}
                    <div>{onePlaceAdded.formatted_address}</div>
                    <div>{onePlaceAdded.description}</div>
                    <RatingStar placeId={ onePlaceAdded.place_id }/>
                </li>
            </div>
        )
    })


    return (
        <div>
            <h2>Places added to Favorites:</h2>
            {<MatchaList data={favs} addPlacesFavButton={false}/>}
            <ul> <RatingStar data={placesAdded} addRatingsButton={true}/> </ul>
        </div>
    )
}

//     return (
//         <div>
//             <h2>Places you've added to Favorites:</h2>
//             <div>
//                 <MatchaList data={favs} addPlacesFavButton={false}/>
//             </div>
//         </div>
//     )
// }

    // const placesRated = favs.map((onePlaceRated) => {
    //     return (
    //     <div>
    //         <li key={onePlaceRated.name}>
    //             <ul className="rating" data-mdb-dynamic="true">
    //                 <li><i className="far fa-star fa-sm text-primary" title="Bad"></i></li>
    //                 <li><i className="far fa-star fa-sm text-primary" title="Poor"></i></li>
    //                 <li><i className="far fa-star fa-sm text-primary" title="OK"></i></li>
    //                 <li><i className="far fa-star fa-sm text-primary" title="Good"></i></li>
    //                 <li><i className="far fa-star fa-sm text-primary" title="Excellent"></i></li>
    //             </ul>
    //         </li>
    //     </div>
    //     )
    // })
