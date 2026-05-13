using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Enums;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _context;
    public StatsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetStats()
    {

        var subjectsCount = _context.Subjects.Count();
        var assignmentsCount = _context.Assignments.Count();
        var assignmentsPending = _context.Assignments.Count(a => a.Status == Status.Pending);
        var assignmentsInProgress = _context.Assignments.Count(a => a.Status == Status.InProgress);
        var assignmentsReview = _context.Assignments.Count(a => a.Status == Status.Review);
        var assignmentsCompleted = _context.Assignments.Count(a => a.Status == Status.Completed);

        var examsPending = _context.Exams.Where(e => e.Date >= DateTime.Now).OrderBy(e => e.Date).ToList();

        var stats = new
        {
             SubjectsCount = subjectsCount,
             AssignmentsCount = assignmentsCount,
             AssignmentsPending = assignmentsPending,
             AssignmentsInProgress = assignmentsInProgress,
             AssignmentsReview = assignmentsReview,
             AssignmentsCompleted = assignmentsCompleted,
             ExamsPending = examsPending
         };

        return Ok(stats);
    }

    [HttpGet("upcomingExams")]
    public IActionResult GetUpcomingExams()
    {
        var upcomingExams = _context.Exams.Where(e => e.Date >= DateTime.Now).OrderBy(e => e.Date).Take(3).ToList();
        return Ok(upcomingExams);
    }

    [HttpGet("upcomingAssignments")]
    public IActionResult GetUpcomingAssignments()
    {
        var upcomingAssignments = _context.Assignments.Where(a => a.DueDate >= DateTime.Now).OrderBy(a => a.DueDate).Take(3).ToList();
        return Ok(upcomingAssignments);
    }
}