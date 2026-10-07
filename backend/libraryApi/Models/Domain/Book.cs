namespace libraryApi.Models.Domain;

public class Book
{
    public uint BookId { get; set; }
    public string? Name { get; set; }
    public string? Autor { get; set; }
    public bool IsBorrow { get; set; }
    public string? Description { get; set; }
}
