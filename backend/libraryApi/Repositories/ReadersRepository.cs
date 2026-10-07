using Dapper;
using MySql.Data.MySqlClient;
using libraryApi.Models.Domain;
using libraryApi.Repositories.Interfaces;

namespace libraryApi.Repositories
{
    public class ReadersRepository : IReadersRepository
    {
        private readonly IConfiguration _configuration;
        public ReadersRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<Reader> GetBookReaders()
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var bookReaders = conn.Query<Reader>("select * from readers where IsActive = TRUE");

                    if (bookReaders != null)
                    {
                        return bookReaders.ToList();
                    }

                    return new List<Reader>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public Reader? GetBookReader(string? citizenshipCardNumber)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { Id = citizenshipCardNumber };
                    var bookReader = conn.Query<Reader>("select * from readers where citizenshipCardNumber = @id and IsActive = TRUE", parameters);

                    if(bookReader?.FirstOrDefault() == null)
                    {
                        return null; 
                    }

                    return bookReader.First();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public void CreateBookReader(Reader bookReader)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { citizenshipCardNumber = bookReader.CitizenshipCardNumber, name = bookReader.Name, surname = bookReader.Surname, dateOfBirth = bookReader.DateOfBirth };
                    var sql = $@"INSERT INTO readers(citizenshipCardNumber, name, surname, dateOfBirth, IsActive)
                        VALUES(@citizenshipCardNumber, @name, @surname, @dateOfBirth, true)
                        ON DUPLICATE KEY UPDATE name = @name, surname = @surname, dateOfBirth = @dateOfBirth, IsActive = TRUE;";
                    conn.Execute(sql, parameters);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Somethings got wrong ! {ex}");
                throw;
            }
        }

        public Reader? DeleteBookReader(string citizenshipCardNumber)
        {
            try
            {
                using (var conn = new MySqlConnection(_configuration.GetSection("db").GetValue<string>("DefaultConnection")))
                {
                    var parameters = new { Id = citizenshipCardNumber };
                    var numberOfDeletedRows = conn.Execute("UPDATE readers SET IsActive = FALSE WHERE CitizenshipCardNumber = @Id AND IsActive = TRUE", parameters);

                    if (numberOfDeletedRows == 0)
                    {
                        throw new Exception($"Reader with id: {citizenshipCardNumber} was not found!");
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
