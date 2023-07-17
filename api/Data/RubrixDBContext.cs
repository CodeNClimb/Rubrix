using Microsoft.EntityFrameworkCore;
using rubrixapi.Models;
namespace rubrixapi.Data
{
    public class RubrixDBContext: DbContext
    {
        public RubrixDBContext(DbContextOptions<RubrixDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Rubric> Rubrics { get; set; }
        public DbSet<Criteria> Criteria { get; set; }
        public DbSet<GradeBoundary> GradeBoundaries { get; set; }
        public DbSet<RubricCriteria> RubricCriteria { get; set; }
        public DbSet<RubricUser> RubricUsers { get; set; }
        public DbSet<Requirement> Requirements { get; set; }

    }
}
