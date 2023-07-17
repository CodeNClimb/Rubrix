using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rubrixapi.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Creator",
                table: "Rubrics",
                newName: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_Rubrics_Username",
                table: "Rubrics",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Rubrics_Users_Username",
                table: "Rubrics",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rubrics_Users_Username",
                table: "Rubrics");

            migrationBuilder.DropIndex(
                name: "IX_Rubrics_Username",
                table: "Rubrics");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Rubrics",
                newName: "Creator");
        }
    }
}
