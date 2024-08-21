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
        return <Button>Added!</Button>
    }
    return <Button onClick={handleOnClick} type="submit">Add to Favorites</Button>
}
