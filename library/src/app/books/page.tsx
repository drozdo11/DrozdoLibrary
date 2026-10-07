import Button from "@/components/button/button.module";
import { Book, BorrowedBook } from "../actions";
import styles from "./page.module.css";

function mapBooks(data: Book[], borrowedBooks: BorrowedBook[]) {
  const books: React.ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const book = data[i];
    const url = `/books/${book.bookId}`;
    const borrowUrl = `/borrowedbooks/borrowbook?bookId=${book.bookId}`;
    const deleteurl = `/books/delete?bookId=${book.bookId}`;
    const urlAddOrEdit = `/books/addoredit?bookId=${book.bookId}`;
    var borrowedBy = <p>No one</p>;

    if (borrowedBooks) {
      const lastBorrowedBook = borrowedBooks.find(b => b.bookId == book.bookId && !b.dateOfReturn);
      if (lastBorrowedBook) {
        borrowedBy = <p><a href={`/readers/${lastBorrowedBook.citizenshipCardNumber}`}>{lastBorrowedBook.citizenshipCardNumber}</a></p>
      }

    }
    books.push(
      <div key={book.bookId} className={styles.card}>
        <div className={styles["book-info"]}>
          <h3>Name:</h3>
          <p> <a href={url}>{book.name}</a></p>
          <h3>Autor:</h3>
          <p> {book.autor}</p>
          <h3>Is borrowed by:</h3>
          {borrowedBy}
        </div>
        <div className={styles["buttons-position"]}>
          {!book.isBorrow && (
            <>
              <Button url={borrowUrl}>Borrow</Button>
              <Button url={urlAddOrEdit}>Edit</Button>
              <Button url={deleteurl}>Delete</Button>
            </>
          )}
        </div>
      </div>
    );
  }
  return (<>{books}</>);
}

async function Page() {
  const data = await fetch('http://localhost:5000/api/books/books');
  const data2 = await fetch('http://localhost:5000/api/borrowedBooks/borrowedBooks')
  const books = await data.json();
  const borrowedBooks = await data2.json();

  return (
    <div className={styles.container}>
      <div className={styles["title"]}>
        <h1>All books</h1>
        <Button url="/books/addoredit">Add book</Button>
      </div>
      {mapBooks(books, borrowedBooks)}
    </div>
  );
}

export default Page;