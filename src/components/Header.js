import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';
import { Modal, Button } from "antd";

import About from "./About"

const Header = (props) => {

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    return (
        <header className="list-view-header">
            <div className="flex-container flex-vertical-center">
                {/* <!-- logo source: https://toppng.com/free-image/experience-the-discussion-online-library-book-logo-PNG-free-PNG-Images_189362 --> */}
                <Link to="/home">
                    <img src={Logo} title="Book Logo" alt="Book Logo" className="site-logo" />
                </Link>
                <Button className="about-button" type="default" size="large" onClick={showModal}>About</Button>
                <Button type="default" size="large">
                    <a href="/logout">Logout</a>
                </Button>
                <Modal
                    title="About"
                    footer={null}
                    centered
                    maskClosable="true"
                    width="75rem"
                    onCancel={onClose}
                    visible={visible}>
                    <About />
                </Modal>
            </div>
        </header>
    );
}

export default Header;