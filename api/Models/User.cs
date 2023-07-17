/* 
 * Mathias Sackey
 * This model builds a User who can create an account with Rubix
*/

using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace rubrixapi.Models
{
    public class User
    { 
        [Required] [Key]
        public string? Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
