namespace libraryApi.Models.Domain

{
    public class BorrowedBook
    {
        public uint BorrowId { get; set; }
        public DateTime? DateOfBorrowing { get; set; }
        public DateTime? DateOfReturn { get; set; }
        public uint BookId {get; set;}
        public string? CitizenshipCardNumber {get; set;}
    }
}
