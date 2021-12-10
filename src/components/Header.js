import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom'; 
import { Button, Drawer } from "antd";
import { Modal } from "antd";

import About from "./About"

const Header = (props) => {

    const [aboutVisible, setAboutVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);

    const showModal = () => {
        setAboutVisible(true);
    }

    const onClose = () => {
        setAboutVisible(false);
    }

    function showDrawer() {
        setProfileVisible(true);
    }

    function closeDrawer() {
        setProfileVisible(false);
    }

    return (
        <header className="list-view-header">
            <div className="flex-container flex-vertical-center">
                {/* <!-- logo source: https://toppng.com/free-image/experience-the-discussion-online-library-book-logo-PNG-free-PNG-Images_189362 --> */}
                <Link to="/home">
                    <img src={Logo} title="Book Logo" alt="Book Logo" className="site-logo" />
                </Link>
                <Button className="profile-button" type="default" size="large" onClick={showDrawer}>Profile</Button>
                <Drawer title="Profile" placement="top" closable={true} visible={profileVisible} onClose={closeDrawer}>

                </Drawer>
                <Button className="about-button" type="default" size="large" onClick={showModal}>About</Button>
                <Modal
                    title="About"
                    footer={null}
                    centered
                    maskClosable="true"
                    width="75rem"
                    onCancel={onClose}
                    visible={aboutVisible}>
                    <About />
                </Modal>
            </div>
        </header>
    );
}

export default Header;