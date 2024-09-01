import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchaList from './MatchaList';
import RatingStar from './Ratings';
// import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ViewFavoritesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        fetch(`/api/favorites`)
            .then((res) => {return res.json()})
            .then((data) => {setFavs(data)})
    }, []);

    const placesAdded = favs.map((onePlaceAdded) => {
        if(!favs) {
            return "No places added to Favorites yet!"
        }
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
        <h3 className="favsHeader">Places added to Favorites:</h3>
        <div>
            <ul> {placesAdded} </ul>
        </div>
    </div>
        )
}
            // <div>
            //     <ul key={onePlaceAdded.name}>
            //     <Row>
            //       <Col md={4}>
            //         <Card>
            //           <Card.Img className="1favCard" variant="top" src={ubeMatcha} />
            //           <Card.Body>
            //             <Card.Title>{onePlaceAdded.name}</Card.Title>
            //             <Card.Text>
            //             <div>{onePlaceAdded.formatted_address}</div>
            //             <div>{onePlaceAdded.description}</div>
            //             <RatingStar placeId={ onePlaceAdded.place_id }/>
            //             </Card.Text>
            //           </Card.Body>
            //         </Card>
            //       </Col>
            //       <Col md={4}>
            //         <Card>
            //           <Card.Img className="2favCard" variant="top" src={butterflyPea} />
            //           <Card.Body>
            //             <Card.Title>{onePlaceAdded.name}</Card.Title>
            //             <Card.Text>
            //             <div>{onePlaceAdded.formatted_address}</div>
            //             <div>{onePlaceAdded.description}</div>
            //             <RatingStar placeId={ onePlaceAdded.place_id }/>
            //             </Card.Text>
            //           </Card.Body>
            //         </Card>
            //       </Col>
            //       </Row>
            //     </ul>
            // </div>


            // <div>
            //     <ul key={onePlaceAdded.name}>
            //     <Row>
            //       <Col md={4}>
            //         <Card>
            //           <Card.Img className="1favCard" variant="top" src={ubeMatcha} />
            //           <Card.Body>
            //             <Card.Title>{onePlaceAdded.name}</Card.Title>
            //             <Card.Text>
            //             <div>{onePlaceAdded.formatted_address}</div>
            //             <div>{onePlaceAdded.description}</div>
            //             <RatingStar placeId={ onePlaceAdded.place_id }/>
            //             </Card.Text>
            //             <Card.Img className="2favCard" variant="top" src={butterflyPea} />
            //             <Card.Title>{onePlaceAdded.name}</Card.Title>
            //             <Card.Text>
            //             <div>{onePlaceAdded.formatted_address}</div>
            //             <div>{onePlaceAdded.description}</div>
            //             <RatingStar placeId={ onePlaceAdded.place_id }/>
            //             </Card.Text>
            //             </Card.Body>
            //         </Card>
            //       </Col>
            //       </Row>
            //     </ul>
            // </div>


//     return (
//         <div>
//             <h2>Places added to Favorites:</h2>
//             {<MatchaList data={favs} addPlacesFavButton={false}/>}
//             <ul> <RatingStar data={placesAdded} addRatingsButton={true}/> </ul>
//         </div>
//     )
// }

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
                    // <li><i className="far fa-star fa-sm text-primary" title="Bad"></i></li>
                    // <li><i className="far fa-star fa-sm text-primary" title="Poor"></i></li>
                    // <li><i className="far fa-star fa-sm text-primary" title="OK"></i></li>
                    // <li><i className="far fa-star fa-sm text-primary" title="Good"></i></li>
                    // <li><i className="far fa-star fa-sm text-primary" title="Excellent"></i></li>
    //             </ul>
    //         </li>
    //     </div>
    //     )
    // })
