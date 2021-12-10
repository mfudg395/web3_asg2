import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom'; 
import { Button, Drawer } from "antd";

const Header = (props) => {

    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        props.aboutOnClick();
    }

    function showDrawer() {
        setVisible(true);
    }

    function closeDrawer() {
        setVisible(false);
    }

    return (
        <header className="list-view-header">
            <div className="flex-container flex-vertical-center">
                {/* <!-- logo source: https://toppng.com/free-image/experience-the-discussion-online-library-book-logo-PNG-free-PNG-Images_189362 --> */}
                <Link to="/home">
                    <img src={Logo} title="Book Logo" alt="Book Logo" className="site-logo" />
                </Link>
                <Button className="profile-button" type="default" size="large" onClick={showDrawer}>Profile</Button>
                <Button className="about-button" type="default" size="large" onClick={handleClick}>About</Button>
                {/* <button className="about-button" onClick={handleClick}>About</button> */}
                <Drawer title="Profile" placement="top" closable={true} visible={visible} onClose={closeDrawer}>

                </Drawer>
            </div>
        </header>
    );
}

export default Header;