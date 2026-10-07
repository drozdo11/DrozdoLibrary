"use client";
import React from 'react';
import styles from './button.module.css';

type params = {
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    url?: string;
    icon?: React.ReactNode;
    width?: string;
};

function Button(params: params) {
    const [url] = React.useState(params.url);
    const isUrl = params.url != '' && params.url != undefined;
    return (
        <>
            {!isUrl &&
                <button
                    className={styles["button-style"]}
                    type={params.type ?? 'button'}
                >
                    {params.icon}
                    {params.children}
                </button>
            }

            {isUrl &&
                <a
                    className={styles["button-style"]}
                    href={url}
                    style={{
                        width: params.width ?? 'auto',
                    }}
                >
                    {params.icon}
                    {params.children}
                </a>
            }
        </>
    )
}

export default Button;