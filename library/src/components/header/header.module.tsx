import React from 'react';
import styles from './header.module.css';
import { LuBookText } from "react-icons/lu";

type params = {
};

function Header(params: params) {
    return (
        <div className={styles.container}>
            <a href="/"><h1>DROZDO LIBRARY <LuBookText /></h1></a>
        </div>
    )
}

export default Header;