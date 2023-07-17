using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
    public enum RoleType
    {
        None,
        Instructor,
        Marker,
        Student
    }
}