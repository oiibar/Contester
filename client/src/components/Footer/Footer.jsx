import React from "react";
import styles from "./Footer.module.scss";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>© 2025 Contester. All rights reserved.</p>
            <div className={styles.socials}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <FaDiscord />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
