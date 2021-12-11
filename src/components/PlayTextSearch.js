import React from 'react';
import * as cloneDeep from 'lodash/cloneDeep';
import { Button } from 'antd';

const PlayTextSearch = (props) => {

    const handleCloseClick = () => props.viewPlay(props.play.id);

    const handleFavoriteClick = () => props.favoritePlay(props.play.id);

    // on Randy's suggestion, taken from https://placeholder.com/
    const src = `https://via.placeholder.com/250.png/?text=${props.play.title.replace(/\s/g, '+')}`

    const handleOnChange = (e) => {
        const currSelection = cloneDeep(props.textSelection);
        if (e.target.name === "act") {
            currSelection.act = e.target.value;
        } else if (e.target.name === "scene") {
            currSelection.scene = e.target.value;
        } else if (e.target.name === "char") {
            currSelection.char = e.target.value;
        } else {
            console.log("didn't change act, scene, or character")
        }
        props.setTextSelection(currSelection);
    }

    const handleSearch = (e) => {
        props.setSearchWords(e.target.value.split(" "));
    }

    return (
        <div className="details-general">
            <img src={src} alt={props.play.title} />
            <h2>{props.play.title}</h2>
            <label for="act">Act</label>
            <select name="act" id="act" className="details-search-option" onChange={handleOnChange}>
                {props.playInfo.playText.acts.map(act => <option value={act.name}>{act.name}</option>)}
            </select>
            <br />
            <label for="scene">Scene</label>
            <select name="scene" id="scene" className="details-search-option" onChange={handleOnChange}>
                {props.playInfo.playText.acts.find(act => act.name === props.textSelection.act).scenes.map(s => <option value={s.name}>{s.name}</option>)}
            </select>
            <br />
            <div>
                <label for="char">Character</label>
                <select name="char" id="char" className="details-search-option" onChange={handleOnChange}>
                    <option value="allPlayers">ALL PLAYERS</option>
                    {props.playInfo.playText.persona.map(p => <option value={p.player}>{p.player}</option>)}
                </select>
                <br />
                <label for="highlight">Highlight text</label>
                <input type="text" name="highlight" id="highlight" placeholder="Search" className="details-search-option" onChange={handleSearch}></input>
            </div>
            <br />
            <Button type="primary" className="details-close-button" onClick={handleCloseClick}>Close</Button><button className="details-favorite-button" onClick={handleFavoriteClick}>❤️</button>
        </div>
    )
}

export default PlayTextSearch;