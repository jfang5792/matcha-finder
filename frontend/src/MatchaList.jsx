import FavoritesButton from "./FavoritesButton"


export default function MatchaList(props) {

    const listItems = props.data.map((listItem) => {
        return (
            <li key={listItem.name}>
                {listItem.name}
                <div>{listItem.formatted_address}</div>
                <div>{listItem.description}</div>
                <FavoritesButton placeId={ listItem.place_id }/>
            </li>
        )
    })
    return (
        <div>
            <h1>List of Matcha spots:</h1>
            <div>
                <ul>{listItems}</ul>
            </div>
        </div>
    )
}
