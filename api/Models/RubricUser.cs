using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace rubrixapi.Models;

[PrimaryKey(nameof(RubricId), nameof(Username))]
public class RubricUser
{
    [Column(Order = 0)]
    [ForeignKey("RubricId")]
    public Guid RubricId { get; set; }
    [Column(Order = 1)]
    [ForeignKey("Username")]
    public string? Username { get; set; }
    
    public string? Role { get; set; }

}