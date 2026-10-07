'use client';
import { useSearchParams } from 'next/navigation'
import { deleteBook } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Suspense } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId') ?? "";
    const url = `/books`;
    return (

        <Suspense fallback={<>...</>}>
            <div className={styles.container}>
                <Button url={url} icon={<RiArrowGoBackFill />} width='30px' />
                <Formular variant='box-hidden' action={(formData) => {
                    deleteBook(formData)
                        .then(data => alert(data));
                }}>
                    <input type="hidden" name="bookId" value={bookId} />

                    <Button type="submit">
                        Delete
                    </Button>
                </Formular>
            </div>
        </Suspense>
    );
};