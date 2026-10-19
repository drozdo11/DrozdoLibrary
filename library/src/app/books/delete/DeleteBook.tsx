'use client';
import { useSearchParams } from 'next/navigation'
import { deleteBook } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Suspense } from 'react';
import InputField from '@/components/input/input-field.module';

export default function Page() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId') ?? "";
    const url = `/books`;
    return (
        <div className={styles.container}>
            <Button url={url} icon={<RiArrowGoBackFill />} width='30px' />
            <Formular variant='box-hidden' action={(formData) => {
                deleteBook(formData)
                    .then(data => alert(data));
            }}>
                <InputField type="hidden" name="bookId" value={bookId} readOnly={false} />

                <Button type="submit">
                    Delete
                </Button>
            </Formular>
        </div>
    );
};