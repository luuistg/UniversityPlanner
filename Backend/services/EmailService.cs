using MailKit.Net.Smtp;
using MimeKit;

namespace Backend.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtpServer = _configuration["Email:SmtpServer"] 
            ?? throw new Exception("Email:SmtpServer no configurado");
        var smtpPort = int.Parse(_configuration["Email:SmtpPort"]!);
        var smtpUser = toEmail;
        var smtpPass = _configuration["Email:SmtpPass"]
            ?? throw new Exception("Email:SmtpPass no configurado");

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("University Planner", toEmail));
        message.To.Add(new MailboxAddress("Estudiante", toEmail));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = body };
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(toEmail, smtpPass);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}