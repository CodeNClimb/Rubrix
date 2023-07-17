/*
 * Mathias Sackey
 * This model links a User to a Role. e.g. instructor, marker, student
 */
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
    [PrimaryKey(nameof(Username), nameof(RubricID))]
    public class UserRole
    {
        [ForeignKey(nameof(Username))] public string? Username { get; set; }
        [ForeignKey (nameof(RubricID))] public Guid RubricID { get; set; }

        public RoleType Role { get; set; }

    }


}
