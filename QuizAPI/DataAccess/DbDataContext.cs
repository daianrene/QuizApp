using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.DataAccess
{
    public class DbDataContext : DbContext
    {
        public DbDataContext(DbContextOptions<DbDataContext> options) : base(options)
        {
        }

        public DbSet<Participant> Participants { get; set; }
        public DbSet<Question> Questions { get; set; }
    }
}
