import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function RatingStar({placeId}) {
    const [ratedStar, setRatedStar] = useState(false)

    const handleStarOnClick = (evt) => {
        fetch(`/api/favorites`, {
            method: "POST",
            body: JSON.stringify({
              place_id: placeId,
              rating: 5
            }),
            headers: {"Content-Type": "application/json"},
        })
        // .then((res) => {return res.json()})
        // .then((data) => {
        //     console.log("DATA:", data)
        //     setRatedStar(true)
        // })

        .then((data) => {
            if (data.success) {
                console.log("Rating saved successfully");
                setRatedStar(true);
            } else {
                console.error("Rating not saved, rate again.");
            }
        })
        .catch((error) => {
            console.error("Error saving rating:", error);
        });

    }

    return ratedStar ? <ul><Button onClick={() => {setRatedStar(false)}} className="ratingBtn" > Rating Saved! <i className="bi bi-star-fill"></i></Button></ul> :
     <div>
        <ul><Button className="ratingBtn-clicked" style={{marginRight: '10px'}} onClick={() => {setRatedStar(true)}}> Excellent <i className="bi bi-star"></i> </Button>
        <Button className="badRatingBtn-clicked" onClick={() => {setRatedStar(true)}}> Meh <i className="bi bi-x-lg"></i> </Button></ul>
    </div>

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
