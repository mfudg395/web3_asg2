import { Button, Card } from 'antd';
import React from 'react';

const PlayCard = (props) => {

    const handleFavoriteClick = () => {
        props.favoritePlay(props.play.id);
    }

    const handleViewClick = () => {
        props.viewPlay(props.play.id);
    }

    // on Randy's suggestion, taken from https://placeholder.com/
    const src = `https://via.placeholder.com/300.png/?text=${props.play.title.replace(/\s/g, '+')}`

    return (
        <Card title={<img src={src} alt={props.play.title} className="play-card-image" />} size="small">
            <p>{props.play.title}<br />({props.play.likelyDate})</p>
            <button className="favorite-button" onClick={handleFavoriteClick}>❤️</button>
            {props.play.filename != "" ? <span className="has-text-icon">📙</span> : null}
            <Button type="primary" className="view-button" onClick={handleViewClick}>View</Button>
        </Card>
    )
}

export default PlayCard;