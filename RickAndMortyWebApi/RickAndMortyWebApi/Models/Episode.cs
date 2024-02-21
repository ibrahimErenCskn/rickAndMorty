using System.ComponentModel.DataAnnotations;

namespace RickAndMortyWebApi.Models
{
    public class Characters
    {

        public int Id { get; set; }
        public string CharacterUrl { get; set; }
        public Episode Episode { get; set; }
    }
    public class Episode
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string AirDate { get; set; }
        [Required]
        public string EpisodeName { get; set; }
        public ICollection<Characters> Characters { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public string Created { get; set; }
    }
}
