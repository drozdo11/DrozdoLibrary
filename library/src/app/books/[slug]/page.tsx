import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./page.module.css";
import Button from "@/components/button/button.module";

async function Page({

    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const data = await fetch(`http://localhost:5000/api/books/book?id=${slug}`);
    const book = await data.json();
    const isBorrow = book.isBorrow == true ? "Yes" : "No"
    const url = `/books`;
    return (
        <div className={styles.container}>
            <Button url={url} icon={<RiArrowGoBackFill />} width='30px' />
            <div>
                <h3>Name:</h3>
                <p> {book.name}</p>
                <h3>Autor:</h3>
                <p> {book.autor}</p>
                <h3>Description:</h3>
                <p> {book.description}</p>
                <h3>Is borrow:</h3>
                <p> {isBorrow}</p>
            </div>
        </div>
    );
}

export default Page;