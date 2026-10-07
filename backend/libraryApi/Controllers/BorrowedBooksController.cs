using libraryApi.Models.Domain;
using libraryApi.Repositories;
using libraryApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BorrowedBooksController : ControllerBase
{
    private readonly IBorrowedBooksRepository _borrowedBooksRepository;

    public BorrowedBooksController(IBorrowedBooksRepository borrowedBooksRepository)
    {
        _borrowedBooksRepository = borrowedBooksRepository;
    }

    [HttpGet("borrowedBook")]
    public IActionResult GetBorrowedBook(uint id)
    {
        try
        {
            return Ok(_borrowedBooksRepository.GetBorrowedBook(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("borrowedBooks")]
    public IEnumerable<BorrowedBook> GetListOfBorrowedBooks()
    {
        return _borrowedBooksRepository.GetListOfBorrowedBooks();
    }

    [HttpPost("borrowedBook")]
    public IActionResult CreateOrUpdateBorrowBook([FromBody] BorrowedBook book)
    {
        try
        {
            _borrowedBooksRepository.CreateOrUpdateBorrowBook(book);
            return Ok(book);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
