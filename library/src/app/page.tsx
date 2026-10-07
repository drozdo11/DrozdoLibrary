import Button from "@/components/button/button.module";
import styles from "./page.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles["button-position"]}>
        <Button url="/books">Books</Button>
        <Button url="/readers">Readers</Button>
        <Button url="/borrowedbooks">Borrowed books</Button>
      </div>
      <img className={styles["image-style"]} src="/Library3.jpg" alt="Library" />
    </div>
  );
}

export default Home;