using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class User
{
    [Key]
    public string Email { get; set; } = string.Empty;
     [Required]
    public string PasswordHash { get; set; } = string.Empty;
}