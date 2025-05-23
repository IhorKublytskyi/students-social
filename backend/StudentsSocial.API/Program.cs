using System.Text;
using DataAccess.Postgres;
using Microsoft.EntityFrameworkCore;
using StudentsSocial.Core.Entities;
using StudentsSocial.Infrastructure;
using backend.Dto_S;
using DataAccess.Postgres.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1"))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddDbContext<StudentsSocialDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("StudentsSocial"));
});

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("JwtOptions"));
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<JwtOptions>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<UsersRepository>();



AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();
    
app.MapPost("/api/register", async (
    RegisterDto registerData, 
    IPasswordHasher passwordHasher, 
    UsersRepository usersRepository) =>
{
    var user = await usersRepository.GetByEmail(registerData.Email);

    if (await usersRepository.ExistsByUsername(registerData.Username))
    {
        return Results.BadRequest("This username is already taken");
    }
    if (user != null)
    {
        return Results.BadRequest("This e-mail is already taken");
    }
    
    user = new UserEntity()
    {
        Id = Guid.NewGuid(),
        Email = registerData.Email,
        PasswordHash = passwordHasher.HashPassword(registerData.Password),
        Username = registerData.Username,
        FirstName = registerData.FirstName,
        LastName = registerData.LastName,
        BirthDate = DateTime.Parse(registerData.BirthDate),
        CreatedAt = DateTime.UtcNow
    };
    await usersRepository.Add(user);
    
    return Results.Ok("You have successfully registered");
});

app.MapPost("/api/login", async (
    [FromBody]LoginDto loginData, 
    UsersRepository usersRepository,
    IPasswordHasher passwordHasher,
    IJwtProvider jwtProvider,
    IConfiguration config) =>
{
    var user = await usersRepository.GetByEmail(loginData.Email);
    if (user == null)
    {
        return Results.BadRequest("The user with this email address does not exist");
    }

    if (!passwordHasher.VerifyHashedPassword(loginData.Password, user.PasswordHash))
    {
        return Results.BadRequest("Invalid email or password");
    }

    var token = jwtProvider.GenerateToken(user);

    return Results.Ok(token);
});
app.Run();
