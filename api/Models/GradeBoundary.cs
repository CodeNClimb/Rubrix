using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
    public class GradeBoundary
    {
        [Required] [Key]
        public Guid GradeBoundaryId { get; set; }

        [ForeignKey("CriteriaId")]
        public Guid CriteriaId { get; set; }

        public string? GradeBoundaryDescription { get; set; }

        public int MaximumGradeAttainable { get; set; }
        
    }
}