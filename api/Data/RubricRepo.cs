using Microsoft.AspNetCore.Mvc;
using rubrixapi.Models;
using rubrixapi.DTOs;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using rubrixapi.Migrations;


namespace rubrixapi.Data
{
    public class RubrixRepo : IRubrixRepo
    {
        private readonly RubrixDBContext _dbContext;

        public RubrixRepo(RubrixDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        /*
         * User Related Methods
         */

        public User AddUser(User user) //adds a user to the databse
        {
            EntityEntry<User> UserEntry = _dbContext.Users.Add(user);
            user = UserEntry.Entity;
            _dbContext.SaveChanges();
            return user;
        }

        public User? GetUser(string username)
        {
            return _dbContext.Users.FirstOrDefault(x => x.Username == username);
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _dbContext.Users.ToList<User>();
            return users;
        }

        public User? UpdateUser(User user)
        {
            User? exists = _dbContext.Users.FirstOrDefault(u => u.Username == user.Username);
            if (exists != null)
            {
                _dbContext.Users.Remove(exists);
                EntityEntry<User> u = _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                user = u.Entity;
                return user;
            }

            return exists;
        }

        public User? DeleteUser(User user)
        {
            User? u = GetUser(user.Username);
            if (u != null)
            {
                _dbContext.Users.Remove(u);
                _dbContext.SaveChanges();
            }

            return u;
        }
        
        /**
         * Methods Related to Rubrics
         */


        public Rubric? AddNewRubric(RubricDto rubric)
        {
            Rubric rubricEntity = new Rubric
            {
                RubricId = new Guid(),
                CourseId = rubric.CourseId,
                RubricTitle = rubric.RubricTitle,
                RubricDescription = rubric.RubricDescription,
                NoteToMarkers = rubric.NoteToMarkers,
                Username = rubric.Creator,
                Creator = _dbContext.Users.FirstOrDefault(c => c.Username == rubric.Creator),
                Course = _dbContext.Courses.FirstOrDefault(c => c.CourseId == rubric.CourseId)
            };
            _dbContext.Rubrics.Add(rubricEntity);
            _dbContext.SaveChanges();

                if (rubricEntity.Username != null)
            {
                AddRubricUser(rubricEntity.RubricId, rubricEntity.Username);
            }
            else
            {
                return null;
            }
          
            return rubricEntity;
        }

        public RubricUser? AddRubricUser(Guid rubricId, string username)
        {
            RubricUser rubricUser = new RubricUser
            {
                RubricId = rubricId,
                Username = username,
                Role = "Instructor"
            };
            _dbContext.RubricUsers.Add(rubricUser);
            _dbContext.SaveChanges();
            return rubricUser;
        }

        public RubricDto? UpdateExistingRubric(Guid rubricId, RubricDto rubricDto)
        {
            var existingRubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);
            
            if (existingRubric == null)
            {
                return null;
            }

            _dbContext.Rubrics.Remove(existingRubric);
            _dbContext.SaveChanges();
            var updatedRubric = new Rubric
            {
                RubricId = existingRubric.RubricId,
                RubricDescription = rubricDto.RubricDescription,
                NoteToMarkers = rubricDto.NoteToMarkers,
                CourseId = rubricDto.CourseId,
                Username = rubricDto.Creator,
                RubricTitle = rubricDto.RubricTitle,
                Creator = _dbContext.Users.FirstOrDefault(c => c.Username == existingRubric.Username),
                Course = _dbContext.Courses.FirstOrDefault(c => c.CourseId == existingRubric.CourseId),
            };

            _dbContext.Rubrics.Add(updatedRubric); 
            _dbContext.SaveChanges();


            var updatedRubricDto = new RubricDto
            {
                RubricTitle = existingRubric.RubricTitle,
                RubricDescription =  existingRubric.RubricDescription,
                NoteToMarkers = existingRubric.RubricTitle,
                CourseId = existingRubric.CourseId,
                Creator = existingRubric.Username
            };

            return updatedRubricDto;
        }

        public bool DeleteRubric(Guid rubricId)
        {
            //delete requirements
            var requirements = _dbContext.Requirements.Where(r => r.RubricId == rubricId).ToList();
            foreach (var requirement in requirements)
            {
                DeleteRequirement(requirement.RequirementId);
            }
            
            //delete rubricCriteria
            var rubricCriteria = _dbContext.RubricCriteria.Where(c => c.RubricId == rubricId).ToList();
            foreach (var rubricCriterion in rubricCriteria)
            {
                //delete gradeBoundaries associated with criteria
                var gradeBoundaries = _dbContext.GradeBoundaries.Where(gb => gb.CriteriaId == rubricCriterion.CriterionId).ToList();
                foreach (var gradeBoundary in gradeBoundaries)
                {
                    DeleteGradeBoundary(gradeBoundary.GradeBoundaryId);
                }
                //delete criteria
                //var criteria = _dbContext.Criteria.Where(c => c.CriteriaId == rubricCriterion.CriterionId);
                //foreach (var criterion in criteria)
                //{
                  //  DeleteCriteria(criterion.CriteriaId);
                //}
            }

            
            var existingRubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);
            if (existingRubric != null)
            {
                _dbContext.Rubrics.Remove(existingRubric);
                _dbContext.SaveChanges();
                return true;
            }

            return false;



        }

        public Rubric? GetRubricById(Guid rubricId)
        {
            // Retrieve the rubric from the database
            var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);
            return rubric;
        }

        public IEnumerable<Rubric> GetRubricsByUsername(string username)
        {
            var rubrics = _dbContext.Rubrics.Where(r => r.Username == username).ToList();
            var output = new List<Rubric>();

            //match rubric to each criteria
            foreach (var rubric in rubrics)
            {
                rubric.Course = _dbContext.Courses.FirstOrDefault(c => c.CourseId == rubric.CourseId);


                var rubricCriteria = _dbContext.RubricCriteria
                    .Where(rc => rc.RubricId == rubric.RubricId);
                foreach (var rc in rubricCriteria)
                {
                 
                    var allCriteria = _dbContext.Criteria.ToList();
                   
                        foreach (var c in allCriteria)
                        {
                            if (c.CriteriaId == rc.CriterionId)
                            {
                                rubric.Criteria.Add(c);

                            }
 
                    }
                }

                //set gradeboundaries for each criteria in the rubric
                var criteria = rubric.Criteria;
                if (criteria != null)
                {
                    foreach (var criterion in criteria)
                    {
                        var allGradeBoundaries = _dbContext.GradeBoundaries;
                        foreach (var gradeBoundary in allGradeBoundaries)
                        {
                            if (gradeBoundary.CriteriaId == criterion.CriteriaId)
                            {
                                criterion.GradeBoundaries.Add(gradeBoundary);
                            }
                        }
                    }
                }
                
                rubric.Creator = _dbContext.Users.FirstOrDefault(c => c.Username == c.Username);
                rubric.Creator.LastName = "REDACTED";
                rubric.Creator.Password = "REDACTED";
                rubric.Creator.Email = "REDACTED";

                rubric.RubricUsers = _dbContext.RubricUsers.Where(ru => rubric.RubricId == ru.RubricId).ToList();
                //get rubrics associated with that user
                rubric.Requirements = _dbContext.Requirements
                    .Where(r => r.RubricId == rubric.RubricId)
                    .ToList();
                output.Add(rubric);
            }
            return output;

        }

        /**
         * Criteria related Methods
         */

        public Criteria? AddNewCriteria(CriteriaDto criteriaDto, Guid rubricId)
        {
            using (var context = _dbContext)
            {
                // Find the rubric by its ID
                var rubric = context.Rubrics.Find(rubricId);

                if (rubric != null)
                {
                    // Create a new Criteria instance
                    var criteria = new Criteria
                    {
                        criteriaTitle = criteriaDto.CriteriaTitle,
                        CriteriaDescription = criteriaDto.CriteriaDescription,
                        CriteriaId = new Guid(),
                        SampleFeedback = criteriaDto.SampleFeedback,
                        MaxGradeAttainable = criteriaDto.MaxGradeAttainable,
                        RubricId = rubricId
                    };
                    
                    
                    context.Criteria.Add(criteria);

                    // Create a new RubricCriteria instance
                    var rubricCriteria = new RubricCriteria
                    {
                        RubricId = rubric.RubricId,
                        CriterionId = criteria.CriteriaId
                    };
                    
                    context.RubricCriteria.Add(rubricCriteria);
                    context.SaveChanges();

                    return criteria;
                }

                return null; 
            }
            
        }

        public Criteria? GetExistingCriteria(Guid criteriaId)
        {
            return _dbContext.Criteria.Find(criteriaId);
        }

        public CriteriaDto? UpdateExistingCriteria(Guid criteriaId, CriteriaDto criteriaDto)
        {
            using (var context = _dbContext)
            {
                var criteria = context.Criteria.FirstOrDefault(c => c.CriteriaId == criteriaId);

                if (criteria != null)
                {
                    criteria.criteriaTitle = criteriaDto.CriteriaTitle;
                    criteria.CriteriaDescription = criteriaDto.CriteriaDescription;
                    criteria.SampleFeedback = criteriaDto.SampleFeedback;
                    criteria.MaxGradeAttainable = criteriaDto.MaxGradeAttainable;
                    context.SaveChanges();
                    var updatedCriteriaDto = new CriteriaDto
                    {
                        CriteriaDescription = criteria.CriteriaDescription,
                        SampleFeedback = criteriaDto.SampleFeedback,
                        MaxGradeAttainable = criteriaDto.MaxGradeAttainable
                    };

                    return updatedCriteriaDto;
                }

                return null; 
            }
        }
        
        public bool DeleteCriteria(Guid criteriaId)
        {
            using (var context = _dbContext)
            {
                var criteria = context.Criteria.FirstOrDefault(c => c.CriteriaId == criteriaId);

                if (criteria != null)
                {
    
                    context.Criteria.Remove(criteria);

                    var rubricCriteria = context.RubricCriteria.Where(rc => rc.CriterionId == criteriaId).ToList();
                    context.RubricCriteria.RemoveRange(rubricCriteria);

                    context.SaveChanges();

                    return true;
                }

                return false; 
            }
        }
        
        public bool AddNewCourse(CourseDto courseDto)
        {
            using (var context = _dbContext)
            {
                var course = new Course
                {
                    Subject = courseDto.Subject,
                    CourseId = Guid.NewGuid().ToString(),
                    Title = courseDto.Title,
                    Description = courseDto.Description,
                    CatalogNbr = courseDto.CatalogNbr
                
                };
                context.Courses.Add(course);
                context.SaveChanges();

                return true;
            }
        }
        public Course? GetCourse(string subject, string catalogNbr)
        {
                
                var course = _dbContext.Courses.FirstOrDefault(c => c.Subject == subject && c.CatalogNbr == catalogNbr);
                return course;
        }
        public IEnumerable<Course> GetCourses()
        {
            var courses = _dbContext.Courses.ToList();

                return courses;
        }
        public Course? UpdateExistingCourse(string courseId, CourseDto courseDto)
        {
            var existingCourse = _dbContext.Courses.FirstOrDefault(c => c.CourseId == courseId);
            if (existingCourse != null)
            {
                existingCourse.Subject = courseDto.Subject;
                existingCourse.CatalogNbr = courseDto.CatalogNbr;
                existingCourse.Title = courseDto.Title;
                existingCourse.Description = courseDto.Description;
                _dbContext.SaveChanges();
                return existingCourse;
            }

            return null;
        }
        /**
         * Grade Boundary related Methods
         */ 
        
        public GradeBoundary? AddNewGradeBoundary(GradeBoundaryDto gradeBoundaryDto)
        {
            var criteria = _dbContext.Criteria.FirstOrDefault(c => c.CriteriaId == gradeBoundaryDto.CriteriaId);

            if (criteria != null)
            {
                var newGradeBoundary = new GradeBoundary
                {
                    GradeBoundaryId = new Guid(),
                    CriteriaId = gradeBoundaryDto.CriteriaId,
                    GradeBoundaryDescription = gradeBoundaryDto.GradeBoundaryDescription,
                    MaximumGradeAttainable = gradeBoundaryDto.MaximumGradeAttainable
                };
            
                _dbContext.GradeBoundaries.Add(newGradeBoundary);
                _dbContext.SaveChanges();
                return newGradeBoundary;
            }

            return null;
        }

        public GradeBoundaryDto? UpdateExistingGradeBoundary(Guid gradeBoundaryId,GradeBoundaryDto gradeBoundaryDto)
        {
            var gradeBoundary = _dbContext.GradeBoundaries.FirstOrDefault(c => c.GradeBoundaryId == gradeBoundaryId);

            if (gradeBoundary != null)
            {
                var criteria = _dbContext.Criteria.FirstOrDefault(c => c.CriteriaId == gradeBoundary.CriteriaId);
                var existingGradeBoundary = criteria.GradeBoundaries.FirstOrDefault(g => g.GradeBoundaryId == gradeBoundaryId);

                if (existingGradeBoundary != null)
                {
                    existingGradeBoundary.GradeBoundaryDescription = gradeBoundaryDto.GradeBoundaryDescription;
                    existingGradeBoundary.MaximumGradeAttainable = gradeBoundaryDto.MaximumGradeAttainable;
                    _dbContext.SaveChanges();

                    return gradeBoundaryDto;
                }
            }

            return null;
        }

        public bool DeleteGradeBoundary(Guid gradeBoundaryId)
        {
            var gradeBoundary = _dbContext.GradeBoundaries.FirstOrDefault(g => g.GradeBoundaryId == gradeBoundaryId);
            if (gradeBoundary != null)
            {
                var criteria = _dbContext.Criteria.FirstOrDefault(c => c.CriteriaId == gradeBoundary.CriteriaId);

                if (gradeBoundary != null)
                {
                    criteria.GradeBoundaries.Remove(gradeBoundary);
                    
                    _dbContext.SaveChanges();

                    return true;
                }
            }
            return false;
        }
        /*
         * Requirement Related Methods
         */
        public Requirement? AddNewRequirement(RequirementDto requirementDto)
        {
            var rubric = _dbContext.Rubrics.Find(requirementDto.RubricId);
            if (rubric == null)
            {
                return null;
            }
            var requirement = new Requirement
            {
                RequirementId = Guid.NewGuid(),
                Description = requirementDto.Description,
                RubricId = requirementDto.RubricId
            };
           
           
            _dbContext.Requirements.Add(requirement);
            _dbContext.SaveChanges();

            return requirement;
        }
        public Requirement? UpdateExistingRequirement(Guid requirementId, RequirementDto requirementDto)
        {
            var existingRequirement = _dbContext.Requirements.FirstOrDefault(r => r.RequirementId == requirementId);
            if (existingRequirement != null)
            {
                var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == existingRequirement.RubricId);
                existingRequirement.Description = requirementDto.Description;
                _dbContext.SaveChanges();
                var updatedRequirement = new Requirement
                {
                    RequirementId = existingRequirement.RequirementId,
                    Description = existingRequirement.Description
                  
                };
                return updatedRequirement;
            }
            return null;
        }
        public bool DeleteRequirement(Guid requirementId)
        {
            var existingRequirement = _dbContext.Requirements.FirstOrDefault(r => r.RequirementId == requirementId);
            
            if (existingRequirement != null)
            {
                var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == existingRequirement.RubricId);
                _dbContext.Requirements.Remove(existingRequirement);
                rubric.Requirements.Remove(existingRequirement);
                _dbContext.SaveChanges();

                return true;
            }

            return false;
        }
        /*
         * Methods relating to rubric users
         */
        public RubricUser AddRubricUser(string username, Guid rubricId, string role)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);
            var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);

            if (user == null || rubric == null)
            {
                return null; // User or Rubric not found
            }
            

            var rubricUser = new RubricUser
            {
                Username = username,
                RubricId = rubricId,
                Role = role
            };
            _dbContext.RubricUsers.Add(rubricUser);
            _dbContext.SaveChanges();

            return rubricUser;
        }
        public bool DeleteRubricUser(string username, Guid rubricId)
        {
            var rubricUser = _dbContext.RubricUsers.FirstOrDefault(ru => ru.Username == username && ru.RubricId == rubricId);

            if (rubricUser == null)
            {
                return false; // RubricUser not found
            }

            var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);
            _dbContext.RubricUsers.Remove(rubricUser);
            _dbContext.SaveChanges();

            return true;
        }
        
        public RubricUser UpdateRubricUser(string username, Guid rubricId, string role)
        {
            var rubricUser = _dbContext.RubricUsers.FirstOrDefault(ru => ru.Username == username && ru.RubricId == rubricId);
            var rubric = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == rubricId);
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (rubricUser == null || rubric == null || user == null)
            {
                return null; // RubricUser or Rubric or User not found
            }
            rubricUser.Role = role;
            rubric.RubricUsers.Add(rubricUser);
            _dbContext.SaveChanges();

            return rubricUser;
        }


    }
}

/*
public Criteria? AddCriteria(Criteria criteria)
{
    Rubric? exists = _dbContext.Rubrics.FirstOrDefault(r => r.RubricId == criteria.RubricId);
    if (exists != null)
    {
        Criteria? c = _dbContext.Criteria.FirstOrDefault(r => r.RubricId == criteria.RubricId);
        if (c == null)
        {
            EntityEntry<Criteria> crit = _dbContext.RubricCriterias.Add(criteria);
            _dbContext.SaveChanges();
            c = crit.Entity;
            return c;
        }
    }

    return null;

}

public Criteria? GetCriteria(Guid criteriaID)
{
    return _dbContext.RubricCriterias.FirstOrDefault(c => c.CriteriaId == criteriaID);
}

public Criteria? UpdateCriteria(Criteria criteria)
{
    Criteria? c = _dbContext.RubricCriterias.FirstOrDefault(r => r.RubricId == criteria.RubricId);
    if (c != null)
    {
        _dbContext.RubricCriterias.Remove(c);
        EntityEntry<Criteria> crit = _dbContext.RubricCriterias.Add(criteria);
        _dbContext.SaveChanges();
        c = crit.Entity;
        return c;
    }

    return c;
}
}*/



/*
public Course? AddCourse(CourseIn course)
{
    Course? c = _dbContext.Courses.FirstOrDefault(x=> x.CourseId == course.CourseId && x.Title == course.Title && x.Description == course.Description);
    if(c == null)
    {
        c = new Course { CourseId = course.CourseId, Subject = course.Subject, CatalogNbr = course.CatalogNbr, Title = course.Title, Description = course.Description};
        EntityEntry<Course> cours = _dbContext.Courses.Add(c);
        c = cours.Entity;
        _dbContext.SaveChanges();
        return c;
    }
    return null;
}
public Course? GetCourse(String courseId)
{
    return _dbContext.Courses.FirstOrDefault( c => c.CourseId == courseId);
}

public IEnumerable<Course> GetCourses()
{
    IEnumerable<Course> courses = _dbContext.Courses.ToList<Course>();
    return courses;
    
}
/*
public Course? UpdateCourse(Course course)
{
    Course? c = _dbContext.Courses.FirstOrDefault(x => x.CourseCode == course.CourseCode && x.Term == course.Term && x.Year == course.Year);
    if (c != null)
    {
        _dbContext.Remove(c);
        EntityEntry<Course> cour = _dbContext.Courses.Remove(c);
        cour = _dbContext.Courses.Add(course);
        _dbContext.SaveChanges();
        c = cour.Entity;
        return c;
    }
    return c;

}
#1#

public UserRole? AddUserRole(string username, Guid rubricID, RoleType role)
{
    UserRole? c = _dbContext.UserRoles.FirstOrDefault(x => x.Username == username && x.RubricID == rubricID);
    if (c == null)
    {
        UserRole userRole = new UserRole { RubricID = rubricID, Username = username, Role = role};
        EntityEntry<UserRole> u = _dbContext.UserRoles.Add(userRole);
        _dbContext.SaveChanges();
        return u.Entity;
    }
    return c;
}

public UserRole? UpdateUserRole(string username, Guid rubricID, RoleType role)
{
    UserRole? c = _dbContext.UserRoles.FirstOrDefault(x => x.Username == username && x.RubricID == rubricID);
    if (c != null) 
    {
        _dbContext.UserRoles.Remove(c);
        c.Role = role;
        EntityEntry<UserRole> userRole = _dbContext.UserRoles.Add(c);
        _dbContext.SaveChanges();
        return userRole.Entity;
    
    }

    AddUserRole(username, rubricID, role);
    return c;
}
public  async void SaveFile(IFormFile file)
{
    var filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).ToString(), "RubrixFiles", file.FileName);
    await using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }
}

}*/
    

