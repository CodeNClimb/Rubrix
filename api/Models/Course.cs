
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
/* 
 * Mathias Sackey
 * This table creates a course 
*/
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{

    public class Course
    {

        [Required] [Key]
        public string? CourseId { get; set; }
        public string? Subject { get; set; }
        public string? CatalogNbr { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }

    }
}
