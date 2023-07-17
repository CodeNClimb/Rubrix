

namespace rubrixapi.DTOs
{
    public class RubricIn
    {
        public string? CourseId { get; set; }
        public string? RubricTitle { get; set; }
        public string? RubricDescription { get; set; }

        public string? NoteToMarkers { get; set; }
        
        public string? Creator { get; set; }
    }
}
