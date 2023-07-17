/* 
 * Mathias Sackey
 * This table creates a rubric
*/
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
    [PrimaryKey(nameof(RubricId))]
    
    public class Rubric
    {
        [Required]
        public Guid RubricId { get; set; }

        [Required]
        public string? CourseId { get; set; }
        
        public string? Username { get; set; }
        public string? RubricTitle { get; set; }
        public string? RubricDescription { get; set; }

        public string? NoteToMarkers { get; set; }
        
        [ForeignKey(nameof(Username))]
        public User? Creator { get; set; }
        
        [ForeignKey(nameof(CourseId))]
        public Course? Course { get; set; }
        
        public ICollection<Criteria>? Criteria { get; set; }
        
        public ICollection<Requirement>? Requirements { get; set; }
        
        public ICollection<RubricUser>? RubricUsers { get; set; }
        



    }
}
