using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ExamController : ControllerBase
{
    private readonly AppDbContext _context;
    public ExamController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetExams()
    {
        var exams = _context.Exams.ToList();
        return Ok(exams);   
    }

    [HttpGet("{id}")]
    public IActionResult GetExamById(Guid id)
    {
        var exam = _context.Exams.FirstOrDefault(e => e.ExamId == id);
        if (exam == null)
        {
            return NotFound();   
        }
        return Ok(exam);
    }

    [HttpPost]
    public IActionResult CreateExam(Exam exam)
    {
        _context.Exams.Add(exam);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetExamById), new { id = exam.ExamId  }, exam);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateExam(Guid id, Exam exam)
    {
        var existingExam = _context.Exams.FirstOrDefault(e => e.ExamId == id);
        if (existingExam == null)
        {
            return NotFound();  
        }
        existingExam.SubjectId = exam.SubjectId;
        existingExam.Date = exam.Date;
        existingExam.Grade = exam.Grade;
        existingExam.ExamType = exam.ExamType;
        existingExam.Title = exam.Title;
        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteExam(Guid id)
    {
        var exam = _context.Exams.FirstOrDefault(e => e.ExamId == id);
        if (exam == null)
        {
            return NotFound();
        }
        _context.Exams.Remove(exam);
        _context.SaveChanges();
        return NoContent();
    }


    [HttpGet ("by-subject")]
    public IActionResult GetExamsBySubject([FromQuery] Guid? subjectId)
    {
        var query = _context.Exams.AsQueryable();
        
        if (subjectId.HasValue)
            query = query.Where(e => e.SubjectId == subjectId.Value);
            
        return Ok(query.ToList());
    }
}