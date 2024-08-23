import { useState} from 'react';
import Button from 'react-bootstrap/Button';

export default function FavoritesButton({placeId}) {
    //handle single button behavior
    //if req is successful, show diff msg
    const [isSuccessful, setSuccessful] = useState(false)

    const handleOnClick = (evt) => {
        fetch(`/api/favorites`, {
            method: "POST",
            body: JSON.stringify({
              place_id: placeId
            }),
            headers: {"Content-Type": "application/json"},
        })
        .then((res) => {return res.json()})
        .then((data) => {
            console.log("DATA:", data)
            setSuccessful(true)
        })
    }

    if (isSuccessful) {
        return <Button className="favBtn-clicked"><i className="bi bi-suit-heart-fill"></i> Added!</Button>
    }
    return <Button onClick={handleOnClick} className="fav-btn" type="submit"><i className="bi bi-suit-heart"></i> Add to Favorites</Button>
}
