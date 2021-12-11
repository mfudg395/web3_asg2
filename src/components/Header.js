import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';
import { Button, Drawer } from "antd";
import { Modal } from "antd";

import Profile from "./Profile";
import About from "./About";

const Header = (props) => {

    const [aboutVisible, setAboutVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);
    const [currentProfile, setCurrentProfile] = useState({});

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

    useEffect(() => {
        const getData = async () => {
            try {
                const url = "http://localhost:8080/currentUser";
                const response = await fetch(url);
                let id = await response.json();
                id = id[0].id;

                const apiUrl = "http://localhost:8080/api/user/" + id;
                const apiResponse = await fetch(apiUrl);
                let userData = await apiResponse.json();
                console.log(userData[0]);
                setCurrentProfile(userData[0]);
                console.log(currentProfile);
            } catch (err) {
                console.log(err);
            }

        }
        getData();
    }, [])

    return (
        <header className="list-view-header">
            <div className="flex-container flex-vertical-center">
                {/* <!-- logo source: https://toppng.com/free-image/experience-the-discussion-online-library-book-logo-PNG-free-PNG-Images_189362 --> */}
                <Link to="/home">
                    <img src={Logo} title="Book Logo" alt="Book Logo" className="site-logo" />
                </Link>
                <div className="header-button-container">
                    <Button className="profile-button" type="default" size="large" onClick={showDrawer}>Profile</Button>
                    <Drawer title="Profile" placement="top" closable={true} visible={profileVisible} onClose={closeDrawer}>
                        <Profile currentProfile={currentProfile} />
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
                    <Button className="logout-button" type="default" size="large">Logout</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;