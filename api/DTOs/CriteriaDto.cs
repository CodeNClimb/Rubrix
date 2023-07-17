namespace rubrixapi.DTOs;

public class CriteriaDto
{
    public string? CriteriaTitle { get; set; }
    public string? CriteriaDescription { get; set; }
 
    public string? SampleFeedback { set; get; }

    public int MaxGradeAttainable { set; get; }
}