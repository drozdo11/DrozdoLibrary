using libraryApi.Repositories;
using libraryApi.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<IReadersRepository, ReadersRepository>();
builder.Services.AddSingleton<IBooksRepository, BooksRepository>();
builder.Services.AddSingleton<IBorrowedBooksRepository, BorrowedBooksRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
