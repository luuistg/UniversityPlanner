using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CorrectCredits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "icon",
                table: "Subjects",
                newName: "Icon");

            migrationBuilder.RenameColumn(
                name: "Credit",
                table: "Subjects",
                newName: "Credits");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "Subjects",
                newName: "icon");

            migrationBuilder.RenameColumn(
                name: "Credits",
                table: "Subjects",
                newName: "Credit");
        }
    }
}
