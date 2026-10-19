'use client';
import { useSearchParams } from 'next/navigation'
import { deleteReader } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';
import InputField from '@/components/input/input-field.module';

export default function Page() {
    const searchParams = useSearchParams();
    const citizenshipCardNumber = searchParams.get('citizenshipCardNumber') ?? "";
    const url = `/readers`;
    return (
        <div className={styles.container}>
            <Button url={url} width='30px' icon={<RiArrowGoBackFill />} />
            <Formular variant='box-hidden' action={(formData) => {

                deleteReader(formData)
                    .then(data => alert(data));
            }}>
                <InputField type="hidden" name="citizenshipCardNumber" value={citizenshipCardNumber} readOnly={false} />

                <Button type="submit">
                    Delete
                </Button>
            </Formular>
        </div>
    );
};