using libraryApi.Models.Domain;
using libraryApi.Repositories;
using libraryApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReadersController : ControllerBase
{
    private readonly IReadersRepository _readersRepository;

    public ReadersController(IReadersRepository readersRepository)
    {
        _readersRepository = readersRepository;
    }

    [HttpGet("reader")]
    public IActionResult GetBookReader(string citizenshipCardNumber)
    {
        try
        {
            return Ok(_readersRepository.GetBookReader(citizenshipCardNumber));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("readers")]
    public IEnumerable<Reader> GetBookReaders()
    {
        return _readersRepository.GetBookReaders();
    }

    [HttpPost("reader")]
    public IActionResult CreateBookReader([FromBody] Reader bookReader)
    {
        try
        {
            _readersRepository.CreateBookReader(bookReader);
            return Ok(bookReader);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("reader")]
    public IActionResult DeleteBookReader(string citizenshipCardNumber)
    {
        try
        {
            return Ok(_readersRepository.DeleteBookReader(citizenshipCardNumber));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
