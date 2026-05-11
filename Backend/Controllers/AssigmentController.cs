using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentController : ControllerBase
{

    private readonly AppDbContext _context;
    public AssignmentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAssignments()
    {
        var assigments = _context.Assignments.ToList();
        return Ok(assigments);
    }

    [HttpGet("{id}")]
    public IActionResult GetAssignmentById(Guid id)
    {
        var assignment = _context.Assignments.FirstOrDefault(a => a.AssignmentId == id);
        if (assignment == null)
        {
            return NotFound();
        }
        return Ok(assignment);
    }

    [HttpPost]
    public IActionResult CreateAssignment(Assignment assignment)
    {
        _context.Assignments.Add(assignment);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAssignmentById), new { id = assignment.AssignmentId }, assignment);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAssignment(Guid id, Assignment assignment)
    {
        var existingAssignment = _context.Assignments.FirstOrDefault(a => a.AssignmentId == id);
        if (existingAssignment == null)
        {
            return NotFound();  
        }
        existingAssignment.SubjectId = assignment.SubjectId;
        existingAssignment.Title = assignment.Title;
        existingAssignment.DueDate = assignment.DueDate;
        existingAssignment.Status = assignment.Status;
        _context.SaveChanges();
        return Ok();    
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAssignment(Guid id)
    {
        var assignment = _context.Assignments.FirstOrDefault(a => a.AssignmentId == id);
        if (assignment == null)
        {
            return NotFound();
        }
        _context.Assignments.Remove(assignment);
        _context.SaveChanges();
        return NoContent();
    }
    
}