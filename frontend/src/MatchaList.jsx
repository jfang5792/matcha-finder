import FavoritesButton from "./FavoritesButton";
import { Container, Row, Col, Card } from 'react-bootstrap';
import vessel from './assets/vessel.jpg';
import cafe from './assets/cafe.png';
import butterflyPea from'./assets/butterflyPea.png';
import strawberryMatcha from './assets/strawberryMatcha.jpg';
import icedMatcha from './assets/icedMatcha.png';
import cafeRattan from './assets/cafeRattan.png';
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
                                src={
                                    index % 6 === 0 ? vessel :
                                    index % 6 === 1 ? cafe :
                                    index % 6 === 2 ? butterflyPea :
                                    index % 6 === 3 ? strawberryMatcha :
                                    index % 6 === 4 ? icedMatcha :
                                    cafeRattan
                                } />
                            <Card.Body>
                                <Card.Title>{listItem.name}</Card.Title>
                                <div className="cardAddy"><i className="bi bi-geo-alt-fill"></i> {listItem.formatted_address}</div>
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
