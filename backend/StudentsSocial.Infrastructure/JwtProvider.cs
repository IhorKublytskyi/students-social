using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StudentsSocial.Core.Entities;

namespace StudentsSocial.Infrastructure;

public class JwtProvider : IJwtProvider
{
    private readonly JwtOptions _options;

    public JwtProvider(IOptions<JwtOptions> options)
    {
        _options = options.Value;
    }

    public string GenerateToken(UserEntity user)
    {
        var claims = new List<Claim>()
        {
            new Claim("Id", user.Id.ToString()),
            new Claim("Email", user.Email),
            new Claim("Username", user.Username),
            new Claim("FirstName", user.FirstName),
            new Claim("LastName", user.LastName)
        };
        var signingCredentials = new SigningCredentials
        (
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)),
            SecurityAlgorithms.HmacSha256
        );
        var token = new JwtSecurityToken
        (
            claims: claims,
            signingCredentials: signingCredentials,
            expires: DateTime.UtcNow.AddHours(_options.Expires)
        );

        var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenJson;
    }
}