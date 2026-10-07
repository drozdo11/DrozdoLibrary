'use client';
import { useSearchParams } from 'next/navigation'
import { getBorrowedBook, unBorrowBook } from "@/app/actions";
import styles from "./page.module.css";
import React, { useEffect } from 'react';
import Formular from '@/components/formular/formular.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';

export default function Page() {
    const searchParams = useSearchParams();
    const borrowId = searchParams.get('borrowid') ?? "";
    const [isReturned, setIsReturned] = React.useState(false);
    const url = `/borrowedbooks`;

    useEffect(() => {
        if (borrowId) {
            getBorrowedBook(Number(borrowId)).then(borrowedBook => {
                setIsReturned(borrowedBook.dateOfReturn != null);
            });
        }
    }, [borrowId]);

    return (
        <div className={styles.container}>
            <Button url="/borrowedbooks" icon={<RiArrowGoBackFill />} width='30px' />
            <Formular variant={"box-hidden"} action={(formData) => {

                unBorrowBook(formData)
                    .then(data => alert(data));
                setIsReturned(true);
            }}>
                {!isReturned &&
                    <>
                        <input type="hidden" name="borrowId" value={borrowId}
                        />

                        <Button type="submit">
                            Return
                        </Button>
                    </>
                }
                {isReturned &&
                    <h3>Book is already returned.</h3>
                }
            </Formular>
        </div>
    );
};