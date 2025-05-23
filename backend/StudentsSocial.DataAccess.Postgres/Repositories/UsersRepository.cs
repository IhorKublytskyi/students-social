using StudentsSocial.Core.Entities;
using Microsoft.EntityFrameworkCore;
namespace DataAccess.Postgres.Repositories;

public class UsersRepository
{
    private readonly StudentsSocialDbContext _dbContext;

    public UsersRepository(StudentsSocialDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Add(UserEntity user)
    {
        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<UserEntity?> GetByEmail(string email)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email);
    }

}