using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Services;


namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    private readonly EmailService _emailService;

    public UserController(AppDbContext context, IConfiguration configuration, EmailService emailService)
    {
        _context = context;
        _configuration = configuration;
        _emailService = emailService;
    }   

    public record LoginRequest(string Email, string Password);

    [HttpPost("log-in")]
    public IActionResult LogIn([FromBody] LoginRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized();
        }
        // Generar JWT
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            claims: [new Claim(ClaimTypes.Email, user.Email)],
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials
        );

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }

    /**
    [HttpGet("test-email")]
    public async Task<IActionResult> TestEmail()
    {
        var userEmail = _context.Users.First().Email;
        await _emailService.SendEmailAsync(
            userEmail,
            "Test UP — Email funcionando",
            "<h1>El sistema de emails funciona correctamente</h1>"
        );
        return Ok("Email enviado");
    }
    **/
}