import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';
import RatingStar from './Ratings';

export default function ViewFavoritesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [favs, setFavs] = useState([]);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        fetch(`/api/favorites`)
            .then((res) => {return res.json()})
            .then((data) => {
                setFavs(data)
                if (data.length === 0) {
                    setMessage(
                        <>
                            No places added to Favorites yet!<br />
                            Let's matcha-cha-cha!
                        </>
                    );
                } else {
                setMessage([]);
                }
            })
    }, []);

    const placesAdded = favs.map((onePlaceAdded) => {
        return (
                <ul className='textParas' key={onePlaceAdded.name}>
                    <i className="bi bi-pin-fill"></i> {onePlaceAdded.name}
                    <div>{onePlaceAdded.formatted_address}</div>
                    <div>{onePlaceAdded.description}</div>
                    <RatingStar placeId={ onePlaceAdded.place_id }/>
                </ul>
                )
        })

return (
    <div className="header-favsPlaces">
        <h3 className="favsHeader">FAVORITES:
        {message && <div className="missingFavs-message"> {message}</div>}
        <ul>{placesAdded.length > 0 ? placesAdded : null}</ul>
        </h3>
    </div>
        )
}
