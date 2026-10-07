using libraryApi.Models.Domain;

namespace libraryApi.Repositories.Interfaces
{
    public interface IBorrowedBooksRepository
    {
        IEnumerable<BorrowedBook> GetListOfBorrowedBooks();
        BorrowedBook? GetBorrowedBook(uint id);
        void CreateOrUpdateBorrowBook(BorrowedBook borrowBook);
    }
}