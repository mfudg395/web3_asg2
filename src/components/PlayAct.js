import React from 'react';
import PlayScene from './PlayScene';

const PlayAct = (props) => {
    if (props.scene === "SCENE I") {
        return (
            <div className="details-text">
                <h2>{props.act.name}</h2>
                <PlayScene scene={props.act.scenes[0]} speaker={props.textSelection.char} searchWords={props.searchWords} />
            </div>
        )
    } else if (props.scene === "SCENE II") {
        return (
            <div className="details-text">
                <h2>{props.act.name}</h2>
                <PlayScene scene={props.act.scenes[1]} speaker={props.textSelection.char} searchWords={props.searchWords} />
            </div>
        )
    } else if (props.scene === "SCENE III") {
        /**
         * Not every act has a third scene, so this conditional handles that situation. If the user has Scene III selected,
         * and then switches to an act without a Scene III, it will default to the first scene of the newly-chosen act.
         */
        if (props.act.scenes[2] !== undefined) {
            return (
                <div className="details-text">
                    <h2>{props.act.name}</h2>
                    <PlayScene scene={props.act.scenes[2]} speaker={props.textSelection.char} searchWords={props.searchWords} />
                </div>
            )
        } else {
            return (
                <div className="details-text">
                    <h2>{props.act.name}</h2>
                    <PlayScene scene={props.act.scenes[0]} speaker={props.textSelection.char} searchWords={props.searchWords} />
                </div>
            )
        }
    }
}

export default PlayAct;