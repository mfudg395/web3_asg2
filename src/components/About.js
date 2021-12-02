import React from 'react';
import './about.css';

const About = (props) => {

    const handleClose = () => {
        props.closeModal();
    }

    return (
        <article className="modal-main about-pane">
            <h1>About</h1>
            <p><b>Group Members:</b> Anthony Dang, Matthew Fudge, Nahuel Paladino</p>
            <p><b>GitHub Link:</b> <a href="https://github.com/npala043/web3_asg1">https://github.com/npala043/web3_asg1</a></p>
            <p><b>Packages and libraries used:</b></p>
                <ul>
                    <li>react-router-dom</li>
                    <li>react-transition-group</li>
                    <li>react-modal</li>
                    <li>react-tabs-component</li>
                    <li>react-highlight-words</li>
                    <li>lodash</li>
                </ul>
            <p><b>Third-party code and assets used:</b></p>
                <ul className="third-party-about">
                    <li><a href="https://www.digitalocean.com/community/tutorials/react-tabs-component">How to Build a Tabs Component with React</a> - for creating PlayDetails tabs</li>
                    <li><a href="https://github.com/reactjs/react-transition-group/blob/master/Migration.md">react-transition-group Migration Guide</a> - for creating HomeBrowser transition animation</li>
                    <li><a href="https://www.w3schools.com/css/css_tooltip.asp">CSS Tooltip Tutorial</a> - for creating Favorites arrow tooltip on hover</li>
                    <li><a href="https://stackoverflow.com/questions/34582405/react-wont-load-local-images">StackOverflow - React won't load local images</a> - for help with displaying images</li>
                    <li><a href="https://loading.io/css/">loading.io</a> - for loading animation</li>
                    <li><a href="https://placeholder.com/">placeholder.com</a> - for placeholder images on play cards</li>
                    <li><a href="https://unsplash.com/photos/YLSwjSy7stw">Alfons Morales, unsplash.com</a> - for hero image</li>
                    <li><a href="https://toppng.com/free-image/experience-the-discussion-online-library-book-logo-PNG-free-PNG-Images_189362">toppng.com</a> - for header logo</li>
                </ul>
            
            <button onClick={handleClose} className="about-close-button">Close</button>
        </article>
    );
}

export default About;