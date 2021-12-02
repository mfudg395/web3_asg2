import React from 'react';
import Highlighter from 'react-highlight-words';

const playSpeech = (props) => {
    return (
        <div>
            <h4>{props.speech.speaker}</h4>
            {props.speech.lines.map(line => <p><Highlighter searchWords={props.searchWords} textToHighlight={line} /></p>)}
        </div>
    )
}

export default playSpeech;