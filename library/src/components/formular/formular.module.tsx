import React from 'react';
import styles from './formular.module.css';
export type variant = 'normal' | 'box-hidden' | undefined;

type params = {
    children: React.ReactNode;
    action?: string | ((formData: FormData) => void | Promise<void>);
    variant?: variant;
};

function getVariantStyle(variant: variant) {
    switch (variant) {
        case 'normal':
            return styles['normal'];
        case 'box-hidden':
            return styles['box-hidden'];
        default:
            return styles['normal'];
    }
}

function Formular(params: params) {
    const formularnVariant = params.variant ?? 'normal';
    const className = getVariantStyle(formularnVariant);

    return (
        <form className={className} action={params.action}>
            {params.children}
        </form>
    )
}

export default Formular;