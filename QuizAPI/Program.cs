using Microsoft.EntityFrameworkCore;
using QuizAPI.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbDataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("QuizDb"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolitics",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
                      });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolitics");

app.UseAuthorization();

app.MapControllers();

app.Run();
