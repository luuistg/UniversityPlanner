using Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Exam
{
    public Guid ExamId { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public DateTime Date { get; set; }
    [Range(0, 10)]
    public float? Grade { get; set; }
    [Required]
    public ExamType Type { get; set; } = ExamType.First;
    [Required]
    public Guid SubjectId { get; set; }
    public Subject? Subject { get; set; }
}