import { Button, Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import PlayCard from './PlayCard';

const PlayList = (props) => {

    const handleSort = (e) => {
        if (e.currentTarget.name == "title") {
            props.sortPlays("title");
        } else {
            props.sortPlays("year");
        }
    }

    return (
        <div className="black-border">
            <div className="sort-container">
                <Space size={20}>
                    <h2 className="inline-block">Sort by:</h2>
                    <Button type="primary" name="title" size="large" onClick={handleSort}>Title</Button>
                    <Button type="primary" name="year" size="large" onClick={handleSort}>Year</Button>
                </Space>
                {/* <button className="sort-title-button" name="title" onClick={handleSort}>Title</button>
                <button className="sort-year-button" name="year" onClick={handleSort}>Year</button> */}
                <span className="legend-icon">❤️ - Add to Favorites</span>
                <span className="legend-icon">📙 - Text available</span>
            </div>
            <div className="plays-list grid-item">
                {props.plays.map(p => <PlayCard play={p} key={p.id} favoritePlay={props.favoritePlay} viewPlay={props.viewPlay} favState={props.favState}/>)}
            </div>
        </div>
    )
}

export default PlayList;