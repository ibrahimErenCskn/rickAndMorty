using System.ComponentModel.DataAnnotations;

namespace RickAndMortyWebApi.Models
{
    public class Origins
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UrlName { get; set; }
        public CharactersM CharactersM { get; set; }
    }
    public class EpisodeName
    {
        public int Id { get; set; }
        public string UrlName { get; set; }
        public CharactersM CharactersM { get; set; }
    }

    public class CharactersM
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Species { get; set; }
        public string Type { get; set; }
        [Required]
        public string Gender { get; set; }
        public ICollection<Origins> Origin { get; set; }
        public ICollection<EpisodeName> EpisodeN { get; set; }
        public string Url { get; set; }
    }
}
