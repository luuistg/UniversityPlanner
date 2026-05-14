using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Assignment> Assignments { get; set; }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<User> Users { get; set; }
}