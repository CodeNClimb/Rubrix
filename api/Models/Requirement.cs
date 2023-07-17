using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models;

public class Requirement
{
    [Key]
    public Guid RequirementId { get; set; }
    public string? Description { get; set; }

    [ForeignKey("RubricId")]
    public Guid RubricId { get; set; }
}