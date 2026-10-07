'use server';
export type Book = {
    bookId: number;
    name: string;
    autor: string;
    description: string;
    isBorrow: boolean;
};

export type BorrowedBook = {
    borrowId: number;
    bookId: number;
    citizenshipCardNumber: string;
    dateOFBorrowing: string;
    dateOfReturn: string;
};

export async function addOrUpdateBook(formData: FormData): Promise<string | undefined> {
    const bookId = Number(formData.get('bookId'));

    var isBorrow = false;

    if (bookId) {
        const bookData = await fetch(
            `http://localhost:5000/api/books/book?id=${bookId}`
        );

        if (bookData.ok) {
            const book = await bookData.json();
            isBorrow = book.isBorrow;
        }
    }

    await fetch('http://localhost:5000/api/books/book', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bookId: Number(formData.get('bookId')),
            name: formData.get('name'),
            autor: formData.get('autor'),
            isBorrow: isBorrow,
            description: formData.get('description')
        })
    });
    return "Book has been successfuly added!";
};

export async function deleteBook(formData: FormData): Promise<string | undefined> {
    const bookId = Number(formData.get('bookId'));
    await fetch(`http://localhost:5000/api/books/book?id=${bookId}`,
        {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    );
    return "Book has been successfuly deleted!";
}

export async function addOrUpdateReader(formData: FormData): Promise<string | undefined> {
    await fetch('http://localhost:5000/api/readers/reader', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            citizenshipCardNumber: formData.get('citizenshipCardNumber'),
            name: formData.get('name'),
            surname: formData.get('surname'),
            dateOfBirth: formData.get('dateOfBirth')
        })
    });
    return "Reader has been successfuly added!";
};

export async function deleteReader(formData: FormData): Promise<string | undefined> {
    const citizenshipCardNumber = formData.get('citizenshipCardNumber');
    await fetch(`http://localhost:5000/api/readers/reader?citizenshipCardNumber=${citizenshipCardNumber}`,
        {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    );
    return "Reader has been successfuly deleted!";
}

export async function borrowBook(formData: FormData): Promise<string | undefined> {
    const bookId = Number(formData.get("bookId"));
    const citizenshipCardNumber = formData.get("citizenshipCardNumber");

    if (!bookId || !citizenshipCardNumber || citizenshipCardNumber == "") {
        return "Book id and citizenship card number are required!";
    }
    const bookData = await fetch(`http://localhost:5000/api/books/book?id=${bookId}`);
    const readerData = await fetch(`http://localhost:5000/api/readers/reader?citizenshipCardNumber=${citizenshipCardNumber}`);
    const book = await bookData.json();

    const readerText = await readerData.text();

    if (!readerText) {
        return "Reader does not exist!";
    }

    const reader = JSON.parse(readerText);

    if (!book || !reader) {
        return "Book or reader does not exists!";
    }

    if (book.isBorrow == true) {
        return "Book is already borrowed!";
    }
    book.isBorrow = true;

    await fetch('http://localhost:5000/api/books/book', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });

    await fetch('http://localhost:5000/api/BorrowedBooks/borrowedBook',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookId: bookId,
                citizenshipCardNumber: citizenshipCardNumber,
                dateOfBorrowing: new Date().toISOString(),
                dateOfReturn: null
            })
        }
    );

    return "Book has been successfuly borrowed!";
}

export async function unBorrowBook(formData: FormData): Promise<string | undefined> {
    const borrowId = Number(formData.get("borrowId"));
    if (!borrowId) {
        return "Borrow id are required!";
    }
    const data = await fetch(`http://localhost:5000/api/BorrowedBooks/borrowedBook?id=${borrowId}`);
    const borrowedBook = await data.json();

    if (!borrowedBook) {
        return "Borrow does not exists!";
    }

    if (borrowedBook.dateOfReturn != null) {
        return "Book is alredy returned!";
    }

    const bookData = await fetch(`http://localhost:5000/api/books/book?id=${borrowedBook.bookId}`);
    const book = await bookData.json();

    if (!book) {
        return "Book does not exists!";
    }

    if (book.isBorrow == false) {
        return "Book is not already borrowed!";
    }

    book.isBorrow = false;
    await fetch('http://localhost:5000/api/books/book', {

        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    });

    borrowedBook.dateOfReturn = new Date().toISOString();
    await fetch('http://localhost:5000/api/borrowedBooks/borrowedBook', {

        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(borrowedBook)
    });

    return "Book has been successfuly returned!";
};

export async function getBorrowedBook(borrowId: number) {
    const data = await fetch(
        `http://localhost:5000/api/borrowedBooks/borrowedBook?id=${borrowId}`
    );

    if (!data.ok) {
        return "Something went wrong!";
    }
    return await data.json();
}


