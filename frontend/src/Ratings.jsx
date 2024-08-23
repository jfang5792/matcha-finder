import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function RatingStar({placeId}) {
    const [ratedStar, setRatedStar] = useState(false)

    const handleStarOnClick = (evt) => {
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
            setRatingStar(true)
        })
    }

    return ratedStar ? <Button onClick={() => {setRatedStar(false)}} className="ratingBtn" > RATED <i className="bi bi-star-fill"></i></Button> :
     <Button className="ratingBtn-clicked" onClick={() => {setRatedStar(true)}}> RATE <i className="bi bi-star"></i></Button>;
}

    // if(isRated) {
    //     return (
    //     <div>
    //         <ul className="rating" data-mdb-dynamic="true">
    //             <li><i className="far fa-star fa-sm text-primary" title="Just No"></i></li>
    //             <li><i className="far fa-star fa-sm text-primary" title="Meh"></i></li>
    //             <li><i className="far fa-star fa-sm text-primary" title="OK"></i></li>
    //             <li><i className="far fa-star fa-sm text-primary" title="Good"></i></li>
    //             <li><i className="far fa-star fa-sm text-primary" title="Excellent"></i></li>
    //         </ul>
    //     </div>
    //     )
    // }
