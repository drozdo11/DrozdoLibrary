'use client';
import { useSearchParams } from 'next/navigation'
import { borrowBook, unBorrowBook } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import InputField from '@/components/input/input-field.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';

export default function Page() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId') ?? "";
    return (
        <div className={styles.container}>
            <Button url="/books" icon={<RiArrowGoBackFill />} width='30px' />
            <Formular  action={(formData) => {
                borrowBook(formData)
                    .then(data => alert(data));
            }}>
                <input type="hidden" name="bookId" value={bookId} />

                <InputField name="citizenshipCardNumber" readOnly={false} submit={true} submitText="Borrow">
                    Enter your citizenshipCardNumber
                </InputField>
            </Formular>
        </div>
    );
};