using StudentsSocial.Core.Entities;

namespace StudentsSocial.Infrastructure;

public interface IJwtProvider
{
    string GenerateToken(UserEntity user);
}