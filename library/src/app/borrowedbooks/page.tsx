import Button from "@/components/button/button.module";
import styles from "./page.module.css";

function mapBorrowedBooks(data: any) {
  const borrowedBooks: React.ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const borrowedBook = data[i];
    const urlBook = `/books/${borrowedBook.bookId}`;
    const urlReturn = `/borrowedbooks/unborrowedbook?borrowid=${borrowedBook.borrowId}`;

    borrowedBooks.push(
      <div key={borrowedBook.borrowId} className={styles.card}>
        <h3>BookId:</h3><p><a href={urlBook}>{borrowedBook.bookId}</a></p>
        <h3>CitizenshipCardNumber:</h3><p>{borrowedBook.citizenshipCardNumber}</p>
        <h3>DateOfBorrowing:</h3><p>{borrowedBook.dateOfBorrowing}</p>
        <h3>DateOfReturn:</h3><p>{borrowedBook.dateOfReturn}</p>
        <Button url={urlReturn} width="60px">Return</Button>
      </div>
    );
  }
  return (<>{borrowedBooks}</>);
}

async function Page() {
  const data = await fetch('http://localhost:5000/api/borrowedBooks/borrowedBooks');
  const borrowedBooks = await data.json();

  return (
    <div className={styles.container}>
      <h1>All borrowedBooks</h1>
      {mapBorrowedBooks(borrowedBooks)}
    </div>
  );
}

export default Page;