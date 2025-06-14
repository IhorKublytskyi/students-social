namespace backend.Infrastructure.Interfaces;

public interface IPasswordHasher
{ 
    string HashPassword(string password);
    bool VerifyHashedPassword(string password, string hashedPassword);
}