using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rubrixapi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessment",
                columns: table => new
                {
                    AssessmentID = table.Column<Guid>(type: "TEXT", nullable: false),
                    CourseID = table.Column<Guid>(type: "TEXT", nullable: false),
                    RubricID = table.Column<Guid>(type: "TEXT", nullable: false),
                    AssessmentType = table.Column<int>(type: "INTEGER", nullable: false),
                    AssessmentDescription = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment", x => x.AssessmentID);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<string>(type: "TEXT", nullable: false),
                    Subject = table.Column<string>(type: "TEXT", nullable: false),
                    CatalogNbr = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                });

            migrationBuilder.CreateTable(
                name: "GradeBoundary",
                columns: table => new
                {
                    GradeBoundaryID = table.Column<Guid>(type: "TEXT", nullable: false),
                    CriteriaID = table.Column<Guid>(type: "TEXT", nullable: false),
                    GradeBoundaryTitle = table.Column<string>(type: "TEXT", nullable: true),
                    GradeBoundaryDesc = table.Column<string>(type: "TEXT", nullable: true),
                    MaximumGradeAttainable = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradeBoundary", x => x.GradeBoundaryID);
                });

            migrationBuilder.CreateTable(
                name: "RubricCriterias",
                columns: table => new
                {
                    CriteriaId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RubricId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CriteriaDescription = table.Column<string>(type: "TEXT", nullable: true),
                    SampleFeedback = table.Column<string>(type: "TEXT", nullable: true),
                    AwardedFeedback = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RubricCriterias", x => x.CriteriaId);
                });

            migrationBuilder.CreateTable(
                name: "Rubrics",
                columns: table => new
                {
                    RubricId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CourseId = table.Column<string>(type: "TEXT", nullable: false),
                    RubricTitle = table.Column<string>(type: "TEXT", nullable: false),
                    RubricDescription = table.Column<string>(type: "TEXT", nullable: true),
                    NoteToMarkers = table.Column<string>(type: "TEXT", nullable: true),
                    Creator = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rubrics", x => x.RubricId);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    RubricID = table.Column<Guid>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.Username, x.RubricID });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Username);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assessment");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "GradeBoundary");

            migrationBuilder.DropTable(
                name: "RubricCriterias");

            migrationBuilder.DropTable(
                name: "Rubrics");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
