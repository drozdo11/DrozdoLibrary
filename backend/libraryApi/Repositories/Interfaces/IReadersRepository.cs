using libraryApi.Models.Domain;

namespace libraryApi.Repositories.Interfaces
{
    public interface IReadersRepository
    {
        IEnumerable<Reader> GetBookReaders();
        Reader? GetBookReader(string? citizenshipCardNumber);
        void CreateBookReader(Reader bookReader);
        Reader? DeleteBookReader(string citizenshipCardNumber);
    }
}
