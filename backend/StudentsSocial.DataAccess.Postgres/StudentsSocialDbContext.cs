using Microsoft.EntityFrameworkCore;
using StudentsSocial.Core.Entities;

namespace DataAccess.Postgres;

public class StudentsSocialDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    
    public StudentsSocialDbContext(DbContextOptions<StudentsSocialDbContext> options):base(options)
    {
        
    }
}