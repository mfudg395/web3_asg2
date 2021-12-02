import React from "react";
import FavoriteItem from "./FavoriteItem.js";

const FavoriteBar = (props) => {

    return (
        <article>
             <h2 className={props.showFavs ? "favorites-header" : "favorites-header-hidden"}>Favorites❤️</h2>
            {props.favPlays.map(p => <FavoriteItem play={p} key={p.id} removePlay={props.removePlay} viewPlay={props.viewPlay} showFavs={props.showFavs}/>)}
        </article>
    );
}

export default FavoriteBar;