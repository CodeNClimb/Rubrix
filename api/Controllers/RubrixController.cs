using Microsoft.AspNetCore.Mvc;
using rubrixapi.Data;
using rubrixapi.Models;
using rubrixapi.DTOs;
using rubrixapi.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Web;


namespace rubrixapi.Controllers
{

    [Route("api")]
    [ApiController]
    [EnableCors("CORS_Policy")]
    public class RubrixController : Controller
    {

        private readonly IRubrixRepo _repo;

        public RubrixController(IRubrixRepo repo)
        {
            _repo = repo;
        }

        /*
         * User Related Endpoints
         */
        [AllowAnonymous]
        [HttpPost("Register")]
        public ActionResult<string> Register(User user) //adds a unique user to the db
        {
            User? u = _repo.GetUser(user.Username);
            if (u != null)
            {
                return BadRequest("username unavailable");
            }

            user.Password =
                UserAuthentication.HashPassword(user.Username, user.FirstName, user.LastName, user.Password);
            _repo.AddUser(user);
            return Ok("registration successful");
        }

        [Authorize(AuthenticationSchemes = "Authentication")]
        [HttpGet("Login")]
        public ActionResult<string> Login() //authorisation to login in the front end
        {
            return Ok("login successful");
        }

        //implemention in the front-end
        [HttpGet("Logout")]
        public ActionResult<bool> Logout()
        {
            return Ok("user logged out");
        }

        //done
        [HttpPut("UpdateUser")]
        public ActionResult<string> UpdateUser(User user)
        {
            User? result = _repo.UpdateUser(user);
            if (result != null)
            {
                return Ok("user successfully updated");
            }

            return NotFound("user does not exist");

        }
        /**
         * Rubric related endpoints
         */

        [HttpPost("AddNewRubric")]
        public IActionResult AddNewRubric(RubricDto rubricDto)
        {
            try
            {
                var rubric = _repo.AddNewRubric(rubricDto);
                return Ok(Json(rubric.RubricId));
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
      
            
        }

        [HttpPut("UpdateExistingRubric/{rubricId}")]
        public IActionResult UpdateExistingRubric(Guid rubricId, RubricDto rubricDto)
        {
            try
            {
                var result = _repo.UpdateExistingRubric(rubricId, rubricDto);
                if (result == null)
                {
                    return NotFound("rubric does not exist");
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return Ok("rubric updated successfully");
        }

        [HttpDeleteAttribute("DeleteRubric/{rubricId}")]
        public IActionResult DeleteRubric(Guid rubricId)
        {
            var output = _repo.DeleteRubric(rubricId);
            if (output)
            {
                return Ok("rubric successfully deleted");
            }

            return NotFound("rubric does not exist");
        }

        [HttpGet("GetRubricsByUsername/{username}")]
        public ActionResult<Rubric> GetRubricsByUsername (string username)
        {
            var output = _repo.GetRubricsByUsername(username);
            return Ok(output);
        }
        /**
        * Criteria related endpoints
        */
        [HttpPost("AddNewCriteria/{rubricId}")]
        public IActionResult AddNewCriteria(CriteriaDto criteriaDto, Guid rubricId)
        {
            var output = _repo.AddNewCriteria(criteriaDto, rubricId);
            if (output == null)
            {
                return NotFound("rubric does not exist");
            }

            return Ok(Json(output.CriteriaId));

        }

        [HttpPut("UpdateExistingCriteria/{criteriaId}")]
        public IActionResult UpdateExistingCriteria(Guid criteriaId, CriteriaDto criteriaDto)
        {
            try
            {
                var output = _repo.UpdateExistingCriteria(criteriaId, criteriaDto);
                if (output == null)
                {
                    return NotFound("criteria does not exist");
                }

                return Ok("criteria updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
  
        }

        [HttpDelete("DeleteCriteria/{criteriaId}")]
        public IActionResult DeleteCriteria(Guid criteriaId)
        {
            Boolean output = _repo.DeleteCriteria(criteriaId);
            if (output)
            {
                return Ok("criteria deleted successfully");
            }

            return NotFound("criteria does not exist");
        }

        [HttpPost("AddNewCourse")]
        public IActionResult AddCourse(CourseDto courseDto)
        {
            bool success = _repo.AddNewCourse(courseDto);
            if (success)
            {
                return Ok("course added successfully.");
            }
            return NotFound("failed to add course.");
            
        }
        [HttpGet("GetCourse/{subject}/{catalogNbr}")]
        public ActionResult<Course> GetCourse(string subject, string catalogNbr)
        {
            var course = _repo.GetCourse(subject, catalogNbr);
            if (course != null)
            {
                return Ok(course);
            }
            return NotFound("Course not found.");
            
        }
        [HttpGet("GetAllCourses")]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            var courses = _repo.GetCourses();
            return Ok(courses);
        }

        [HttpPut("UpdateExistingCourse/{courseId}")]
        public ActionResult<Course> UpdateExistingCourse(string courseId, CourseDto courseDto)
        {
            var updatedCourse = _repo.UpdateExistingCourse(courseId, courseDto);
            if (updatedCourse != null)
            {
                return Ok(updatedCourse);
            }

            return NotFound("Course not found.");
        }
        [HttpPost("AddNewGradeBoundary")]
        public ActionResult<GradeBoundary> AddNewGradeBoundary(GradeBoundaryDto gradeBoundaryDto)
        {
            var newGradeBoundary = _repo.AddNewGradeBoundary(gradeBoundaryDto);
        
            if (newGradeBoundary == null)
                return BadRequest("criteria does not exist");

            return Ok(newGradeBoundary);
        }

        [HttpPut("UpdateExistingGradeBounary/{gradeBoundaryId}")]
        public IActionResult UpdateExistingGradeBoundary(Guid gradeBoundaryId, GradeBoundaryDto gradeBoundaryDto)
        {
            var updatedGradeBoundary = _repo.UpdateExistingGradeBoundary(gradeBoundaryId,gradeBoundaryDto);

            if (updatedGradeBoundary == null)
                return NotFound("Grade boundary or criteria not found.");

            return Ok(updatedGradeBoundary);
        }

        [HttpDelete("DeleteGradeBoundary/{gradeBoundaryId}")]
        public IActionResult DeleteGradeBoundary(Guid gradeBoundaryId)
        {
            var isDeleted = _repo.DeleteGradeBoundary(gradeBoundaryId);

            if (!isDeleted)
                return NotFound("grade boundary or criteria not found.");

            return NoContent();
        }
        
        [HttpPost("AddNewRequirement")]
        public ActionResult<Requirement> AddNewRequirement(RequirementDto requirementDto)
        {
            var newRequirement = _repo.AddNewRequirement(requirementDto);

            if (newRequirement != null)
            {
                return Ok(newRequirement);
            }

            return BadRequest("Failed to add new requirement");
        }

        [HttpPut("UpdateExistingRequirement/{requirementId}")]
        public ActionResult<RequirementDto> UpdateExistingRequirement(Guid requirementId, RequirementDto requirementDto)
        {
            try
            {
                var updatedRequirement = _repo.UpdateExistingRequirement(requirementId, requirementDto);

                if (updatedRequirement != null)
                {
                    return Ok(updatedRequirement);
                }

                return NotFound();
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("DeleteRequirement/{requirementId}")]
        public ActionResult DeleteRequirement(Guid requirementId)
        {
            var result = _repo.DeleteRequirement(requirementId);

            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }
        /**
         * Rubric User Controllers
         */
        
        [HttpPost("AddRubricUser")]
        public IActionResult AddRubricUser(string username, Guid rubricId, string role)
        {
            try
            {
                var rubricUser = _repo.AddRubricUser(username, rubricId, role);

                if (rubricUser == null)
                {
                    return NotFound(); // Rubric or User not found
                }

                return Ok("rubric user added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("DeleteRubricUser/{username}/{rubricId}")]
        public IActionResult DeleteRubricUser(string username, Guid rubricId)
        {
            var isDeleted = _repo.DeleteRubricUser(username, rubricId);

            if (!isDeleted)
            {
                return NotFound(); // RubricUser not found
            }

            return NoContent();
        }

        [HttpPut("UpdateRubricUser/{username}/{rubricId}")]
        public IActionResult UpdateRubricUser(string username, Guid rubricId, string role)
        {
            var rubricUser = _repo.UpdateRubricUser(username, rubricId, role);

            if (rubricUser == null)
            {
                return NotFound(); // RubricUser or Rubric or User not found
            }

            return Ok("rubric user updated");
        }
        
    }

}

/*
//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("UpdateRubric")]
public ActionResult<string> UpdateRubric (Rubric rubric)
{
    Rubric? result = _repo.UpdateRubric(rubric);
    if ( result == null)
    {
        return Ok("rubric does not exist");
    }
    return Ok("rubric updated successfully");
}
//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("AddCriteria")]
public ActionResult<string> AddCriteria(Criteria criteria) {

    Criteria? result = _repo.AddCriteria(criteria);
    if (result == null)
    {
        return Ok("criteria already exists or rubric does not exist for specified criteria");
    }
    return Ok("criteria added successfully");
}
//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("UpdateCriteria")]
public ActionResult<string> UpdateCriteria(Criteria criteria)
{
    Criteria? result = _repo.UpdateCriteria(criteria);
    if (result == null)
    {
        return Ok("no criteria to update");
    }
    return Ok("criteria updated successfully");
   
}
//done

[HttpPost("AddCourse")]
public ActionResult<string> AddCourse(CourseIn course)
{
    Course? result = _repo.AddCourse(course);
    if (result == null)
    {
        return Ok("course already exists");
    }
    return Ok("course added successfully");

}

[HttpGet("GetCourses")]
public IActionResult GetCourses()
{
    return new JsonResult(_repo.GetCourses().ToArray());
}

/*
//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("UpdateCourse")]
public ActionResult<string> UpdateCourse(Course course)
{
    Course? result = _repo.UpdateCourse(course);
    if (result == null)
    {
        return Ok("course does not exist");
    }
    return Ok("course updated successfully");
}
#1#

//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("AddMarker")]
public ActionResult<string> AddMarker(Rubric rubric, string username)
{
    UserRole? userRole = _repo.AddUserRole(username, rubric.RubricId, RoleType.Marker);
    if (userRole == null)
    {
        return Ok("user or rubric does not exist");
    }
    return Ok("marker added successfully");
    
}

//done
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpPost("AddStudent")]
public ActionResult<string> AddStudent(Rubric rubric, string username)
{
    UserRole? userRole = _repo.AddUserRole(username, rubric.RubricId, RoleType.Student);
    if (userRole == null)
    {
        return Ok("user or rubric does not exist");
    }
    return Ok("student added successfully");
}

//implementation required
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpDelete("RemoveMarker")]
public ActionResult<string> RemoveMarker(Rubric rubric, string Username)
{
    UserRole? userRole = _repo.AddUserRole(Username, rubric.RubricId, RoleType.None);
    if (userRole == null)
    {
        return Ok("user or rubric does not exist");
    }
    return Ok("marker removed successfully");
}

//implementation required
[Authorize(AuthenticationSchemes = "Authentication")]
[HttpDelete("RemoveStudent")]
public ActionResult<string> RemoveStudent(Rubric rubric, string username)
{
    UserRole? userRole = _repo.AddUserRole(username, rubric.RubricId, RoleType.None);
    if (userRole == null)
    {
        return Ok("user or rubric does not exist");
    }
    return Ok("student removed successfully");
}

[HttpPost("UploadRubricFile")]
public ActionResult UploadRubricFile(IFormFile file)
{
    if (file.Length > 0)
    {
        _repo.SaveFile(file);
        return Ok("file uploaded");
    }
    else
    {
        return Ok("file not uploaded");
    }
}


}*/
    
