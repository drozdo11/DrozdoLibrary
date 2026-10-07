import React from 'react';
import styles from './header.module.css';


type params = {

};

function Header(params: params) {
    return (
        <div className={styles["top-container"]}>
            <h1>Vitaj v mojej knižnici</h1>
        </div>
    )
}

export default Header;