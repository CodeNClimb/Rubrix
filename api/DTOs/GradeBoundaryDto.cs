namespace rubrixapi.DTOs;

public class GradeBoundaryDto
{
    public Guid CriteriaId { get; set; }

    public string? GradeBoundaryDescription { get; set; }

    public int MaximumGradeAttainable { get; set; }
}