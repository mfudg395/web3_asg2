import React from 'react';
import './about.css';

const About = (props) => {

    return (
        <div class="grid-container">
            <div class="grid-header">
                <p><b>Group Members:</b> Anthony Dang, Matthew Fudge, Nahuel Paladino</p>
                <p><b>GitHub Link:</b> <a href="https://github.com/mfudg395/web3_asg2">https://github.com/mfudg395/web3_asg2</a></p>
            </div>
            <div class="grid-child">
                <p><b>Packages and libraries used:</b></p>
                <ul>
                    <li>antd</li>
                    <li>bcrypt</li>
                    <li>dotenv</li>
                    <li>ejs</li>
                    <li>express</li>
                    <li>express-flash</li>
                    <li>express-session</li>
                    <li>mongoose</li>
                    <li>lodash</li>
                    <li>passport</li>
                    <li>passport-local</li>
                    <li>react-highlight-words</li>
                    <li>react-transition-group</li>
                    <li>react-tabs-component</li>
                    <li>react-router-dom</li>
                </ul>
            </div>
            <div class="grid-child">
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
            </div>
        </div>
    );
}

export default About;