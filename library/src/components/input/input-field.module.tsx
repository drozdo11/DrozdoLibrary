"use client";
import React from 'react';
import styles from './input-field.module.css';
import Button from '../button/button.module';

type params = {
    children?: React.ReactNode;
    name?: string;
    value?: string;
    readOnly: boolean;
    submit?: boolean;
    submitText?: string;
    type?: 'text' | 'datetime-local';
    onChange?: (value: React.FormEvent<HTMLInputElement>) => void;
    onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

function InputField(params: params) {
    return (
        <div className={styles.container}>
            <label className={styles["label"]}>
                {params.children}
                <input className={styles["input"]} type={params.type ?? "text"} name={params.name} value={params.value} readOnly={params.readOnly} onChange={(e) => {
                    if (params.onChange) {
                        params.onChange(e);
                    }
                }}
                    onBlur={
                        (e) => {
                            if (params.onBlur) {
                                params.onBlur(e);
                            }
                        }}
                    onKeyDown={
                        (e) => {
                            if (params.onKeyDown) {
                                params.onKeyDown(e);
                            }
                        }
                    }
                    onFocus={
                        (e) => {
                            if (params.onFocus) {
                                params.onFocus(e);
                            }
                        }
                    }
                />
            </label>
            {params.submit && (
                <Button type="submit">
                    {params.submitText ?? 'Submit'}
                </Button>
            )}
        </div>
    );
}

export default InputField;