using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace rubrixapi.Models;

[PrimaryKey(nameof(RubricId), nameof(CriterionId))]
public class RubricCriteria
{
    [ Column(Order = 0)] [Required]
    public Guid RubricId { get; set; }
    [Column(Order = 1)]
    public Guid CriterionId { get; set; }

    [ForeignKey("RubricId")] [Required]
    public Rubric? Rubric { get; set; }

    [ForeignKey("CriterionId")]
    public Criteria? Criterion { get; set; }
}