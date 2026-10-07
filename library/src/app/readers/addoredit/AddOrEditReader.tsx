'use client';
import { useSearchParams } from 'next/navigation'
import { addOrUpdateReader } from "@/app/actions";
import styles from "./page.module.css";
import Formular from '@/components/formular/formular.module';
import InputField from '@/components/input/input-field.module';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Button from '@/components/button/button.module';

export default function Page() {
    const searchParams = useSearchParams();
    const citizenshipCardNumber = searchParams.get('citizenshipCardNumber') ?? "";
    const url = `/readers`;
    return (
        <div className={styles.container}>
            <Button url={url} width='30px' icon={<RiArrowGoBackFill />} />
            <Formular variant="normal" action={(formData) => {
                addOrUpdateReader(formData)
                    .then(data => alert(data))
            }}>
                <input type="hidden" name="citizenshipCardNumber" value={citizenshipCardNumber} />
                <InputField name="citizenshipCardNumber" readOnly={false}>
                    Enter your citizenshipCardNumber:
                </InputField>

                <InputField name="name" readOnly={false}>
                    Enter your name:
                </InputField>

                <InputField name="surname" readOnly={false}>
                    Enter your surname:
                </InputField>

                <InputField name="dateOfBirth" type={"datetime-local"} readOnly={false} submit={true} submitText="Add">
                    Enter your dateOfBirth:
                </InputField>
            </Formular>
        </div>
    );
};