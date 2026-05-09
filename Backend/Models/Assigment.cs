using Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;
public class Assignment
{
    public Guid AssignmentId { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public DateTime DueDate { get; set; }
    public Status Status { get; set; } = Status.Pending;
    [Required]
    public Guid SubjectId { get; set; }
    public Subject? Subject { get; set; } 

}