using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Enums;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubjectController : ControllerBase
{
    private readonly AppDbContext _context;

    public SubjectController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetSubjects()
    {
        var subjects = _context.Subjects.ToList();
        return Ok(subjects);
    }

    [HttpGet("{id}")]
    public IActionResult GetSubjectById(Guid id)
    {
        var subject = _context.Subjects.FirstOrDefault(s => s.SubjectId == id);
        
        if (subject == null)
        {
            return NotFound();
        }
        return Ok(subject);
    }

    [HttpPost]
    public IActionResult CreateSubject(Subject subject)
    {
        _context.Subjects.Add(subject);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetSubjectById), new { id = subject.SubjectId }, subject);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSubject(Guid id, Subject subject)
    {
        var existingSubject = _context.Subjects.FirstOrDefault(s => s.SubjectId == id);
        if (existingSubject == null)
        {
            return NotFound();
        }
        existingSubject.Name = subject.Name;
        existingSubject.Credits = subject.Credits;
        existingSubject.Icon = subject.Icon;
        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteSubject(Guid id)
    {
        var subject = _context.Subjects.FirstOrDefault(s => s.SubjectId == id);
        if (subject == null)        {
            return NotFound();
        }
        _context.Subjects.Remove(subject);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}/stats")]
    public IActionResult GetSubjectStats(Guid id)
    {
        var subject = _context.Subjects.FirstOrDefault(s => s.SubjectId == id);
        if (subject == null)
        {
            return NotFound();
        }

        var assignmentsCount = _context.Assignments.Count(a => a.SubjectId == id);
        var assignmentsPending = _context.Assignments.Count(a => a.SubjectId == id && a.Status == Status.Pending);
        var assignmentsInProgress = _context.Assignments.Count(a => a.SubjectId == id && a.Status == Status.InProgress);
        var assignmentsReview = _context.Assignments.Count(a => a.SubjectId == id && a.Status == Status.Review);
        var assignmentsCompleted = _context.Assignments.Count(a => a.SubjectId == id && a.Status == Status.Completed);
        var examsCount = _context.Exams.Count(e => e.SubjectId == id);
        var examsAverageGrade = _context.Exams.Where(e => e.SubjectId == id && e.Grade.HasValue).Average(e => e.Grade) ?? 0;

        var stats = new
        {
            SubjectName = subject.Name,
            AssignmentsCount = assignmentsCount,
            AssignmentsPending = assignmentsPending,
            AssignmentsInProgress = assignmentsInProgress,
            AssignmentsReview = assignmentsReview,
            AssignmentsCompleted = assignmentsCompleted,
            ExamsCount = examsCount,
            ExamsAverageGrade = examsAverageGrade
        };

        return Ok(stats);
    }

    [HttpGet("withStats")]
    public IActionResult GetSubjectWithStats()
    {

        var result = _context.Subjects.Select(s => new
        {
            SubjectId = s.SubjectId,
            name = s.Name,
            credits = s.Credits,
            icon = s.Icon,
            AssignmentsCount = _context.Assignments.Count(a => a.SubjectId == s.SubjectId),
            AssignmentsPending = _context.Assignments.Count(a => a.SubjectId == s.SubjectId && a.Status == Status.Pending),
            AssignmentsInProgress = _context.Assignments.Count(a => a.SubjectId == s.SubjectId && a.Status == Status.InProgress),
            AssignmentsReview = _context.Assignments.Count(a => a.SubjectId == s.SubjectId && a.Status == Status.Review),
            AssignmentsCompleted = _context.Assignments.Count(a => a.SubjectId == s.SubjectId && a.Status == Status.Completed),
            ExamsCount = _context.Exams.Count(e => e.SubjectId == s.SubjectId),
            ExamsAverageGrade = _context.Exams.Where(e => e.SubjectId == s.SubjectId && e.Grade.HasValue).Average(e => e.Grade) ?? 0
        }).ToList();

        return Ok(result);
    }
}