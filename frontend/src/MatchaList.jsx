import FavoritesButton from "./FavoritesButton";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import vessel from './assets/vessel.jpg';
// import Row from 'react-bootstrap/Row';


export default function MatchaList({data, addPlacesFavButton}) {
    const listItems = data.map((listItem) => {
        return (
            <ul key={listItem.name}>
                {/* <Row xs={1} md={2} className="g-4"> */}
                <CardGroup className="placeCards" style={{ maxWidth: '18rem', margin: '0 10px' }}>
                    <Card>
                        <Card.Img variant="top" src={vessel}/>
                        <Card.Body>
                {listItem.name}
                <div>{listItem.formatted_address}</div>
                <div>{listItem.description}</div>
                {addPlacesFavButton && <FavoritesButton placeId={ listItem.place_id }/>}
                        </Card.Body>
                    </Card>
                </CardGroup>
                {/* </Row> */}
            </ul>
        )
    })
    return (
        <div>
            <ul><h3>List of Matcha spots:</h3></ul>
            <div>
                <ul>{listItems}</ul>
            </div>
        </div>
    )
}
