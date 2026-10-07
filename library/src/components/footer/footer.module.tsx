import styles from './footer.module.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

type params = {

};

function Footer(params: params) {
    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                <div>
                    <a className={styles.icon} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                </div>
                <div>
                    <a className={styles.icon} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </div>
                <div>
                    <a className={styles.icon} href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>
            </div>
            <div>
                <p>© 2026 DrozdoLibrary. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;