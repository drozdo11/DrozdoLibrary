CREATE DATABASE LibraryManagement;

CREATE TABLE books (
    BookId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Autor VARCHAR(255) NOT NULL,
    IsBorrow BOOLEAN NOT NULL DEFAULT FALSE,
    Description VARCHAR(1000)
);

CREATE TABLE Readers (
    CitizenshipCardNumber VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Surname VARCHAR(100) NOT NULL,
    DateOfBirth DATE NOT NULL
);

CREATE TABLE borrowedbooks (
    BorrowId INT AUTO_INCREMENT PRIMARY KEY,
    BookId INT NOT NULL,
    CitizenshipCardNumber VARCHAR(20) NOT NULL,
    DateOfBorrowing DATETIME NOT NULL,
    DateOfReturn DATETIME NULL,

FOREIGN KEY (BookId) REFERENCES books(BookId),
FOREIGN KEY (CitizenshipCardNumber) REFERENCES readers(CitizenshipCardNumber)
);