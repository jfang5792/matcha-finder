import FavoritesButton from "./FavoritesButton"
import ViewFavoritesPage from "./Favorites"

export default function MatchaList({data, addPlacesFavButton}) {
    const listItems = data.map((listItem) => {
        return (
            <li key={listItem.name}>
                {listItem.name}
                <div>{listItem.formatted_address}</div>
                <div>{listItem.description}</div>
                { addPlacesFavButton && <FavoritesButton /> }
                {/* <FavoritesButton placeId={ listItem.place_id }/> */}
            </li>
        )
    })

    return (
        <div>
            <h3>List of Matcha spots:</h3>
            <div>
                <ul>{listItems}</ul>
            </div>
        </div>
    )
}
