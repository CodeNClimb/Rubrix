using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rubrixapi.Migrations
{
    /// <inheritdoc />
    public partial class FixCriteriaTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RubricId",
                table: "Criteria",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Criteria_RubricId",
                table: "Criteria",
                column: "RubricId");

            migrationBuilder.AddForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria",
                column: "RubricId",
                principalTable: "Rubrics",
                principalColumn: "RubricId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria");

            migrationBuilder.DropIndex(
                name: "IX_Criteria_RubricId",
                table: "Criteria");

            migrationBuilder.DropColumn(
                name: "RubricId",
                table: "Criteria");
        }
    }
}
