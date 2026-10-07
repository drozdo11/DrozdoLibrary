import Button from "@/components/button/button.module";
import styles from "./page.module.css";

function mapReaders(data: any) {
  const readers: React.ReactNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const reader = data[i];
    const url = `/readers/${reader.citizenshipCardNumber}`;
    const deleteurl = `/readers/delete?citizenshipCardNumber=${reader.citizenshipCardNumber}`
    readers.push(
      <div key={reader.citizenshipCardNumber} className={styles.card}>
        <h3>CitizenshipCardNumber:</h3><p><a href={url}>{reader.citizenshipCardNumber}</a></p>
        <h3>Name:</h3> <p>{reader.name}</p>
        <h3>Surname:</h3><p>{reader.surname}</p>
        <h3>DateOfBirth:</h3><p>{reader.dateOfBirth?.split('T')[0]}</p>
        <Button url={deleteurl} width="60px">Delete</Button>
      </div>
    );
  }
  return (<>{readers}</>);
}

async function Page() {
  const data = await fetch('http://localhost:5000/api/readers/readers');
  const readers = await data.json();

  return (
    <div className={styles.container}>
      <div className={styles["title"]}>
        <h1>All readers</h1>
        <Button url="/readers/addoredit">Add reader</Button>
      </div>
      {mapReaders(readers)}
    </div>
  );
}

export default Page;