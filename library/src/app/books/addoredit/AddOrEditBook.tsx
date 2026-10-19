'use client';
import { useSearchParams } from 'next/navigation'
import { addOrUpdateBook } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import InputField from '@/components/input/input-field.module';
import { RiArrowGoBackFill } from "react-icons/ri";
import Button from '@/components/button/button.module';


export default function Page() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get('bookId') ?? "";
    const url = `/books`;
    return (
        <div className={styles.container}>
            <Button url={url} icon={<RiArrowGoBackFill />} width='30px'/>
            <Formular action={(formData) => {
                addOrUpdateBook(formData)
                    .then(data => alert(data))
            }}>
                <InputField type="hidden" name="bookId" value={bookId} readOnly={false} />
                <InputField name="name" readOnly={false}>
                    Enter your name:
                </InputField>

                <InputField name="autor" readOnly={false}>
                    Enter your autor:
                </InputField>

                <InputField name="description" readOnly={false} submit={true} submitText="Add">
                    Enter your description:
                </InputField>
            </Formular>
        </div>
    );
};