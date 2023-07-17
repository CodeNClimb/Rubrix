using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace rubrixapi.Models;

[PrimaryKey((nameof(Creator)))]
public class RubrixFile
{
    [ForeignKey((nameof(Creator)))]
    public string? Creator { get; set; }

    public byte[]? Content { get; set; }

}