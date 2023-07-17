using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
    public class Criteria
    {
        [Required] [Key]
        public Guid CriteriaId { get; set; }

        public string? criteriaTitle { get; set; }
        public string? CriteriaDescription { get; set; }
 
        public string? SampleFeedback { set; get; }

        public int MaxGradeAttainable { set; get; }
        
        public Guid  RubricId { get; set; }
        public ICollection<GradeBoundary>? GradeBoundaries { get; set; }
    }
}
