'use client';
import { useSearchParams } from 'next/navigation'
import { deleteReader } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import Button from '@/components/button/button.module';
import { RiArrowGoBackFill } from 'react-icons/ri';

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
                <input type="hidden" name="citizenshipCardNumber" value={citizenshipCardNumber} />

                <Button type="submit">
                    Delete
                </Button>
            </Formular>
        </div>
    );
};