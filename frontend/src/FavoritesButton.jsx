import Button from 'react-bootstrap/Button';
import { useState} from 'react';

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

    if(isSuccessful) {
        return "Added!"
    }
    return <Button onClick={handleOnClick} type="submit">Add to Favorites</Button>
}
