using Dapper;
using MySql.Data.MySqlClient;
using libraryApi.Models.Domain;
using libraryApi.Repositories.Interfaces;
using System.Diagnostics.Eventing.Reader;

namespace libraryApi.Repositories
{
    public class BooksRepository : IBooksRepository
    {
        private readonly IConfiguration _configuration;
        public BooksRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Book? GetBook(uint id)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { Id = id };
                    var book = conn.Query<Book>("select * from Books where bookid = @id", parameters);

                    if (book?.FirstOrDefault() == null)
                    {
                        return null;
                    }

                    return book?.First();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public IEnumerable<Book> GetListOfBooks()
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var listOfBooks = conn.Query<Book>("select * from Books");

                    if (listOfBooks != null)
                    {
                        return listOfBooks.ToList();
                    }

                    return new List<Book>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public void CreateOrUpdateBook(Book book)
        {
            try
            {
                if (book != null)
                {
                    var existingBook = GetBook(book.BookId);
                    if (existingBook == null)
                    {
                        using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                        {
                            var parameters = new { name = book.Name, autor = book.Autor, isBorrow = book.IsBorrow, description = book.Description };
                            var sql = $@"INSERT INTO books(name, autor, isBorrow, description)
                                VALUES(@name, @autor, @isBorrow, @description);";
                            conn.Execute(sql, parameters);
                        }
                    }
                    else
                    {
                        using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                        {
                            var parameters = new {bookId = book.BookId, name = book.Name, autor = book.Autor, isBorrow = book.IsBorrow, description = book.Description };
                            var sql = $@"UPDATE books SET name = @name, autor = @autor, isBorrow = @isBorrow, description = @description WHERE bookId = @bookId;";

                            conn.Execute(sql, parameters);
                        }
                    }
                }
                else 
                {
                    throw new Exception("Book is empty !");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public Book? DeleteBook(uint id)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { Id = id };
                    var numberOfDeletedRows = conn.Execute("DELETE FROM books WHERE bookId = @id", parameters);

                    if (numberOfDeletedRows == 0)
                    {
                        throw new Exception($"Book with id: {id} was not found!");
                    }
                    return null;
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