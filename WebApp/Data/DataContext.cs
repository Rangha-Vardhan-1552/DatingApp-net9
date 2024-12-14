using Microsoft.EntityFrameworkCore;
using WebApp.Entities;
namespace WebApp.Data

{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users{ get; set; }
    }
    
    
}
