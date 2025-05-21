namespace StudentsSocial.Infrastructure;
using BCrypt.Net;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.EnhancedHashPassword(password);
    }

    public bool VerifyHashedPassword(string password, string hashedPassword)
    {
        return BCrypt.EnhancedVerify(password, hashedPassword);
    }
}