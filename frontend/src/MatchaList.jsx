import FavoritesButton from "./FavoritesButton";
import { Container, Row, Col, Card } from 'react-bootstrap';
import vessel from './assets/vessel.jpg';
import cafe from './assets/cafe.png';
import butterflyPea from'./assets/butterflyPea.png';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function MatchaList({data, addPlacesFavButton}) {
    return (
        <div>
            <Container>
                <Row>
                    {data.map((listItem, index) => (
                        //wrap each card in 'Col'
                        <Col md={4} key={listItem.place_id || index}>
                        <Card className="cardName">
                            <Card.Img
                                variant="top"
                                //write ternary for each image assigned to each index iteration
                                src={index % 3 === 0 ? vessel : index % 3 === 1 ? cafe : butterflyPea} />
                            <Card.Body>
                                <Card.Title>{listItem.name}</Card.Title>
                                <div className="cardAddy">{listItem.formatted_address}</div>
                                <div className="cardDescription">{listItem.description}</div>
                                {addPlacesFavButton && <FavoritesButton placeId={listItem.place_id}/>}
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}


// export default function MatchaList({data, addPlacesFavButton}) {
//     const listItems = data.map((listItem) => {
//         return (
//                 // <ul key={listItem.name}>
//                 // {/* <Container className="card"> */}
//                 // <Row xs={1} sm={2} md={3} lg={4}>
//                 // {/* <CardGroup style={{ maxWidth: '18rem', margin: '0 10px' }}> */}
//                 //     <Card>
//                 //         <Card.Img variant="top" src={vessel}/>
//                 //         <Card.Body>
//                 // {listItem.name}
//                 // <div>{listItem.formatted_address}</div>
//                 // <div>{listItem.description}</div>
//                 // {addPlacesFavButton && <FavoritesButton placeId={ listItem.place_id }/>}
//                 //         </Card.Body>
//                 //     </Card>
//                 // {/* </CardGroup> */}
//                 // </Row>
//                 // {/* </Container> */}
//                 // </ul>
//                 <ul key={listItem.name}>
//                 <Container>
//                 <Row>
//                   <Col md={4}>
//                     <Card>
//                       <Card.Img className="card1" variant="top" src={vessel} />
//                       <Card.Body>
//                         <Card.Title>{listItem.name}</Card.Title>
//                         <Card.Text>
//                         <div>{listItem.formatted_address}</div>
//                         <div>{listItem.description}</div>
//                         {addPlacesFavButton && <FavoritesButton placeId={ listItem.place_id }/>}
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   <Col md={4}>
//                     <Card>
//                       <Card.Img className="card2" variant="top" src={cafe} />
//                       <Card.Body>
//                       <Card.Title>{listItem.name}</Card.Title>
//                         <Card.Text>
//                         <div>{listItem.formatted_address}</div>
//                         <div>{listItem.description}</div>
//                         {addPlacesFavButton && <FavoritesButton placeId={ listItem.place_id }/>}
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   <Col md={4}>
//                     <Card>
//                       <Card.Img variant="top" src={matchaThings} />
//                       <Card.Body>
//                       <Card.Title>{listItem.name}</Card.Title>
//                         <Card.Text>
//                         <div>{listItem.formatted_address}</div>
//                         <div>{listItem.description}</div>
//                         {addPlacesFavButton && <FavoritesButton placeId={ listItem.place_id }/>}
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 </Row>
//               </Container>
//               </ul>
//         )
//     })
//     return (
//         <div>
//             <ul><h3>Search results:</h3></ul>
//             <div>
//                 <ul>{listItems}</ul>
//             </div>
//         </div>
//     )
// }
