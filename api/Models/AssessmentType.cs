using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rubrixapi.Models
{
	public enum AssessmentType

	{
		None, 
		Individual,
		Group
	}
}