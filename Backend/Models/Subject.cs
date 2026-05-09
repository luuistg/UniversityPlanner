using System.ComponentModel.DataAnnotations;

namespace Backend.Models;


public class Subject
{
    public Guid SubjectId{ get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    [Range(1, 20)]
    public float Credit { get; set; }
}
