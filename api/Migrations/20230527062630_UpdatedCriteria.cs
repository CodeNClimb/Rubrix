using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rubrixapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedCriteria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria");

            migrationBuilder.DropForeignKey(
                name: "FK_RubricUsers_Users_Username",
                table: "RubricUsers");

            migrationBuilder.DropIndex(
                name: "IX_RubricUsers_Username",
                table: "RubricUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "RubricId",
                table: "Criteria",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "criteriaTitle",
                table: "Criteria",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria",
                column: "RubricId",
                principalTable: "Rubrics",
                principalColumn: "RubricId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria");

            migrationBuilder.DropColumn(
                name: "criteriaTitle",
                table: "Criteria");

            migrationBuilder.AlterColumn<Guid>(
                name: "RubricId",
                table: "Criteria",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_RubricUsers_Username",
                table: "RubricUsers",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Criteria_Rubrics_RubricId",
                table: "Criteria",
                column: "RubricId",
                principalTable: "Rubrics",
                principalColumn: "RubricId");

            migrationBuilder.AddForeignKey(
                name: "FK_RubricUsers_Users_Username",
                table: "RubricUsers",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
