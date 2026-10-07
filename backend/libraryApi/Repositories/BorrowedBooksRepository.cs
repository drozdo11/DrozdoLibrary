using Dapper;
using MySql.Data.MySqlClient;
using libraryApi.Models.Domain;
using libraryApi.Repositories.Interfaces;

namespace libraryApi.Repositories
{
    public class BorrowedBooksRepository : IBorrowedBooksRepository
    {
        private readonly IBooksRepository _booksRepository;
        private readonly IReadersRepository _readersRepository;
        private readonly IConfiguration _configuration;
        public BorrowedBooksRepository(IConfiguration configuration, IBooksRepository booksRepository, IReadersRepository readersRepository)
        {
            _booksRepository = booksRepository;
            _readersRepository = readersRepository;
            _configuration = configuration;
        }

        public BorrowedBook? GetBorrowedBook(uint id)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { Id = id };
                    var borrowedBooks = conn.Query<BorrowedBook>("select * from borrowedbooks where borrowid = @id", parameters);

                    if (borrowedBooks?.FirstOrDefault() == null)
                    {
                        return null;
                    }

                    var borrowedBook = borrowedBooks.First();
                    return borrowedBook;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public IEnumerable<BorrowedBook> GetListOfBorrowedBooks()
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var listOfBorrowedBooks = conn.Query<BorrowedBook>("select * from borrowedbooks");

                    if (listOfBorrowedBooks != null)
                    {
                        return listOfBorrowedBooks.ToList();
                    }

                    return new List<BorrowedBook>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public void CreateOrUpdateBorrowBook(BorrowedBook borrowedBook)
        {
            try
            {
                if (borrowedBook != null)
                {
                    var existingBorrowedBook = GetBorrowedBook(borrowedBook.BorrowId);
                    if (existingBorrowedBook == null)
                    {
                        using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                        {
                            var parameters = new {borrowId = borrowedBook.BorrowId, bookId = borrowedBook.BookId, citizenshipCardNumber = borrowedBook.CitizenshipCardNumber, 
                                dateOfBorrowing = borrowedBook.DateOfBorrowing, dateOfReturn = borrowedBook.DateOfReturn};
                            var sql = $@"INSERT INTO borrowedbooks(bookId, citizenshipCardNumber, dateOfBorrowing, dateOfReturn)
                                VALUES(@bookId, @citizenshipCardNumber, @dateOfBorrowing, @dateOfReturn);";
                            conn.Execute(sql, parameters);
                        }
                    }
                    else
                    {
                        using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                        {
                            var parameters = new {borrowId = borrowedBook.BorrowId, bookId = borrowedBook.BookId, citizenshipCardNumber = borrowedBook.CitizenshipCardNumber,
                                dateOfBorrowing = borrowedBook.DateOfBorrowing, dateOfReturn = borrowedBook.DateOfReturn };
                            var sql = $@"UPDATE borrowedbooks SET bookId = @bookId, citizenshipCardNumber = @citizenshipCardNumber, 
                                dateOfBorrowing = @dateOfBorrowing, dateOfReturn = @dateOfReturn WHERE borrowId = @borrowId;";

                            conn.Execute(sql, parameters);
                        }
                    }
                }
                else
                {
                    throw new Exception("BorrowBook is empty !");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }
    }
}
