 using Azure.Identity;
 using rubrixapi.Models;
using rubrixapi.DTOs;
namespace rubrixapi.Data
{
    public interface IRubrixRepo
    {

       /*
        * User related Methods
        */
        IEnumerable<User> GetUsers();
        User AddUser(User user);
        User? GetUser(string username);
        User? UpdateUser(User user);
        User? DeleteUser(User user);
        
        /*
         * Rubric related Methods
         */
        Rubric? AddNewRubric(RubricDto rubricDto);
        RubricUser? AddRubricUser(Guid rubricId, string username);
        RubricDto? UpdateExistingRubric(Guid rubricId, RubricDto rubricDto);
        bool DeleteRubric(Guid rubricId);
        Rubric? GetRubricById(Guid rubricId);
        //returns json of all rubrics associated with that user.
        IEnumerable<Rubric> GetRubricsByUsername(string username);
        
        /**
         * Criteria Related Methods
         */
        Criteria? AddNewCriteria(CriteriaDto criteriaDto, Guid rubricId);
        CriteriaDto? UpdateExistingCriteria(Guid criteriaId, CriteriaDto criteriaDto);
        bool DeleteCriteria(Guid criteriaId);

        /**
         *  Course Related Methods
         */
        IEnumerable<Course> GetCourses();
        Course? GetCourse(string subject, string catalogNbr);
        bool AddNewCourse(CourseDto courseDto);
        Course? UpdateExistingCourse(string courseId, CourseDto courseDto);
        
        /*
         * GradeBoundary Related Methods
         */
        GradeBoundary? AddNewGradeBoundary(GradeBoundaryDto criteriaDto);
        GradeBoundaryDto? UpdateExistingGradeBoundary(Guid gradeBoundaryId,GradeBoundaryDto gradeBoundaryDto);
        bool DeleteGradeBoundary(Guid gradeBoundaryId);
        
        /*
         * Requirements Related Methods
         */

        Requirement? AddNewRequirement(RequirementDto requirementDto);
        Requirement? UpdateExistingRequirement(Guid requirementId, RequirementDto requirementDto);
        bool DeleteRequirement(Guid requirementId);
        
        /*
         * Rubric User Methods
         */

        RubricUser? AddRubricUser(string username, Guid rubricId, string role);
        bool DeleteRubricUser(string username, Guid rubricId);
        RubricUser UpdateRubricUser(string username, Guid rubricId, string role);






    }

}
