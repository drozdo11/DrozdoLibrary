import Button from "@/components/button/button.module";
import styles from "./page.module.css";
import { RiArrowGoBackFill } from "react-icons/ri";

async function Page({

    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const data = await fetch(`http://localhost:5000/api/readers/reader?citizenshipCardNumber=${slug}`);
    const reader = await data.json();
    const url = `/readers`;
    return (
        <div className={styles.container}>
            <Button url={url} icon={<RiArrowGoBackFill />} width='30px' />
            <div className={styles["reader-card"]}>
                <h3>Citizenship card number:</h3>
                <p> {reader.citizenshipCardNumber}</p>
                <h3>Name:</h3>
                <p> {reader.name}</p>
                <h3>Surname:</h3>
                <p> {reader.surname}</p>
                <h3>Date of birth:</h3>
                <p> {reader.dateOfBirth?.split('T')[0]}</p>
            </div>
        </div>
    );
}

export default Page;