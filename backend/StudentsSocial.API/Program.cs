using DataAccess.Postgres;
using Microsoft.EntityFrameworkCore;
using StudentsSocial.Core.Entities;
using StudentsSocial.Infrastructure;
using backend.Dto_S;
using DataAccess.Postgres.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<StudentsSocialDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("StudentsSocial"));
});
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<ErrorMessage>();
builder.Services.AddScoped<UsersRepository>();

var app = builder.Build();
    
app.MapPost("/api/register", async (
<<<<<<< HEAD
    RegisterDto registerData,
    IPasswordHasher passwordHasher,
    UsersRepository usersRepository) =>
{
    var user = await usersRepository.GetByEmail(registerData.Email);

    if (user != null)
        return Results.BadRequest("This e-mail is already taken.");

    if (!new EmailAddressAttribute().IsValid(registerData.Email))
        return Results.BadRequest("Email is invalid.");

=======
    RegisterDto registerData, 
    IPasswordHasher passwordHasher, 
    UsersRepository usersRepository,
    ErrorMessage errorMessage = null ) =>
{
    var user = await usersRepository.GetByEmail(registerData.Email);

    if (await usersRepository.ExistsByUsername(registerData.Username))
    {
        errorMessage = new ErrorMessage("This username is already taken", "username-taken");
        return Results.BadRequest(errorMessage);
    }
    if (user != null)
    {
        errorMessage = new ErrorMessage("This e-mail is already taken", "email-taken");
        return Results.BadRequest(errorMessage);
    }
    
>>>>>>> 92b1dbb87546bbc01f94e7e2b7df032e22c928c2
    user = new UserEntity()
    {
        Id = Guid.NewGuid(),
        Email = registerData.Email,
        PasswordHash = passwordHasher.HashPassword(registerData.Password),
        Username = registerData.Username,
        FirstName = registerData.FirstName,
        LastName = registerData.LastName,
        BirthDate = registerData.BirthDate,
        CreatedAt = DateTime.UtcNow
    };
    await usersRepository.Add(user);
<<<<<<< HEAD

    return Results.Ok("You have successfully registered.");
});
=======
    
    return Results.Ok("You have successfully registered");
});
// app.MapGet("/api/login", async (
//     LoginDto loginData, 
//     UsersRepository usersRepository, 
//     IPasswordHasher passwordHasher) =>
// {
//     var user = await usersRepository.GetByEmail(loginData.Email);
    
//     if (user == null)
//         return Results.BadRequest("User was not found.");

//     if (!passwordHasher.VerifyHashedPassword(loginData.Password, user.PasswordHash))
//         return Results.BadRequest("Invalid password.");

//     return Results.Ok();
// });
>>>>>>> 92b1dbb87546bbc01f94e7e2b7df032e22c928c2

// app.MapGet("/api/login", async (
//     LoginDto loginData, 
//     UsersRepository usersRepository, 
//     IPasswordHasher passwordHasher) =>
// {
//     var user = await usersRepository.GetByEmail(loginData.Email);
    
//     if (user == null)
//         return Results.BadRequest("User was not found.");

//     if (!passwordHasher.VerifyHashedPassword(loginData.Password, user.PasswordHash))
//         return Results.BadRequest("Invalid password.");
//     return Results.Ok();
// });

app.Run();
