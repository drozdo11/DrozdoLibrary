using libraryApi.Models.Domain;
using libraryApi.Repositories;
using libraryApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly IBooksRepository _booksRepository;

    public BooksController(IBooksRepository booksRepository)
    {
        _booksRepository = booksRepository;
    }

    [HttpGet("book")]
    public IActionResult GetBook(uint id)
    {
        try
        {
            return Ok(_booksRepository.GetBook(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("books")]
    public IEnumerable<Book> GetListOfBooks()
    {
        return _booksRepository.GetListOfBooks();
    }

    [HttpPost("book")]
    public IActionResult CreateOrUpdateBook([FromBody] Book book)
    {
        try
        {
            _booksRepository.CreateOrUpdateBook(book);
            return Ok(book);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("book")]
    public IActionResult DeleteBook(uint id)
    {
        try
        {
            return Ok(_booksRepository.DeleteBook(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}