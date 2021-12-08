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
            <div className="plays-list grid-item">
                {props.plays.map(p => <PlayCard play={p} key={p.id} favoritePlay={props.favoritePlay} viewPlay={props.viewPlay} favState={props.favState}/>)}
            </div>
        </div>
    )
}

export default PlayList;