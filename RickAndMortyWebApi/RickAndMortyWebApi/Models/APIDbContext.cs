using Microsoft.EntityFrameworkCore;

namespace RickAndMortyWebApi.Models
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions option):base(option) 
        {
        }

        public DbSet<Episode> Episodes { get; set; }
        public DbSet<CharactersM> CharactersM { get; set; }
    }
}
