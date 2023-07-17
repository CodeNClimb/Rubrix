using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace rubrixapi.Models
{
    [PrimaryKey(nameof(AssessmentID))]
    public class Assessment
    {
        [Required]
        public Guid AssessmentID { get; set; }
        [Required]
        [ForeignKey(nameof(CourseID))]
        public Guid CourseID { get; set; }
        [Required]
        [ForeignKey(nameof(RubricID))]
        public Guid RubricID { get; set; }

        [Required]
        [EnumDataType(typeof(AssessmentType))]
        [JsonConverter(typeof(StringEnumConverter))]
        public AssessmentType AssessmentType { get; set; }

        public string? AssessmentDescription { get; set; }

    }
}