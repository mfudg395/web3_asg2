import React from 'react';

const PlayCharacter = (props) => {
    return (
        <div>
            <p>{props.character} - {props.desc}</p>
        </div>
    )
}

export default PlayCharacter;