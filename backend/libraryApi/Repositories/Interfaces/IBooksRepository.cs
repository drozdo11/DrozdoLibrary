using libraryApi.Models.Domain;

namespace libraryApi.Repositories.Interfaces
{
    public interface IBooksRepository
    {
        IEnumerable<Book> GetListOfBooks();
        Book? GetBook(uint id);
        void CreateOrUpdateBook(Book book);
        Book? DeleteBook(uint id);
    }
}
