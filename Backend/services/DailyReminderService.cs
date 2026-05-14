using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class DailyReminderService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<DailyReminderService> _logger;

    public DailyReminderService(IServiceProvider serviceProvider, ILogger<DailyReminderService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await WaitUntilEightAM(stoppingToken);

            try
            {
                await SendDailyReminder(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al enviar recordatorio diario");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task WaitUntilEightAM(CancellationToken stoppingToken)
    {
        var now = DateTime.Now;
        var nextRun = DateTime.Today.AddHours(8);

        if (now > nextRun)
            nextRun = nextRun.AddDays(1);

        var delay = nextRun - now;
        _logger.LogInformation("Próximo recordatorio en {Delay}", delay);
        await Task.Delay(delay, stoppingToken);
    }

    private async Task SendDailyReminder(CancellationToken stoppingToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var emailService = scope.ServiceProvider.GetRequiredService<EmailService>();

        var userEmail = await db.Users
            .Select(u => u.Email)
            .FirstOrDefaultAsync(stoppingToken);

        if (userEmail == null)
        {
            _logger.LogWarning("No hay usuario configurado, no se manda recordatorio");
            return;
        }

        var today = DateTime.Today;
        var tomorrow = today.AddDays(1);
        var dayAfterTomorrow = today.AddDays(2);

        var todayAssignments = await db.Assignments
            .Where(a => a.DueDate >= today && a.DueDate < tomorrow)
            .ToListAsync(stoppingToken);

        var tomorrowAssignments = await db.Assignments
            .Where(a => a.DueDate >= tomorrow && a.DueDate < dayAfterTomorrow)
            .ToListAsync(stoppingToken);

        var todayExams = await db.Exams
            .Where(e => e.Date >= today && e.Date < tomorrow)
            .ToListAsync(stoppingToken);

        var tomorrowExams = await db.Exams
            .Where(e => e.Date >= tomorrow && e.Date < dayAfterTomorrow)
            .ToListAsync(stoppingToken);

        if (!todayAssignments.Any() && !tomorrowAssignments.Any() &&
            !todayExams.Any() && !tomorrowExams.Any())
        {
            _logger.LogInformation("Sin eventos próximos, no se manda recordatorio");
            return;
        }

        var body = BuildEmailBody(todayAssignments, tomorrowAssignments, todayExams, tomorrowExams);

        await emailService.SendEmailAsync(
            userEmail,
            $"📚 Recordatorio UP — {today:dddd, d 'de' MMMM}",
            body
        );

        _logger.LogInformation("Recordatorio enviado a {Email}", userEmail);
    }

    private string BuildEmailBody(
        List<Backend.Models.Assignment> todayAssignments,
        List<Backend.Models.Assignment> tomorrowAssignments,
        List<Backend.Models.Exam> todayExams,
        List<Backend.Models.Exam> tomorrowExams)
    {
        var sb = new System.Text.StringBuilder();

        sb.Append(@"
        <div style='font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;'>
            <div style='background: #FEFCD9; border-radius: 16px; padding: 24px;'>
                <h1 style='color: #FF4747; font-size: 22px; margin: 0 0 4px;'>University Planner</h1>
                <p style='color: #8A8960; font-size: 14px; margin: 0 0 24px;'>Resumen del día</p>
        ");

        if (todayAssignments.Any() || todayExams.Any())
        {
            sb.Append("<h2 style='color: #1A1A1A; font-size: 16px; margin: 0 0 12px;'>📅 Hoy</h2>");
            sb.Append("<ul style='padding: 0; list-style: none; margin: 0 0 20px;'>");
            foreach (var a in todayAssignments)
                sb.Append($"<li style='background: white; border-radius: 10px; padding: 12px; margin-bottom: 8px;'><strong>Entrega:</strong> {a.Title} <span style='color: #FF4747;'>· {a.DueDate:HH:mm}</span></li>");
            foreach (var e in todayExams)
                sb.Append($"<li style='background: white; border-radius: 10px; padding: 12px; margin-bottom: 8px;'><strong>Examen:</strong> {e.Title} <span style='color: #FF4747;'>· {e.Date:HH:mm}</span></li>");
            sb.Append("</ul>");
        }

        if (tomorrowAssignments.Any() || tomorrowExams.Any())
        {
            sb.Append("<h2 style='color: #1A1A1A; font-size: 16px; margin: 0 0 12px;'>📆 Mañana</h2>");
            sb.Append("<ul style='padding: 0; list-style: none; margin: 0;'>");
            foreach (var a in tomorrowAssignments)
                sb.Append($"<li style='background: white; border-radius: 10px; padding: 12px; margin-bottom: 8px;'><strong>Entrega:</strong> {a.Title} <span style='color: #FF4747;'>· {a.DueDate:HH:mm}</span></li>");
            foreach (var e in tomorrowExams)
                sb.Append($"<li style='background: white; border-radius: 10px; padding: 12px; margin-bottom: 8px;'><strong>Examen:</strong> {e.Title} <span style='color: #FF4747;'>· {e.Date:HH:mm}</span></li>");
            sb.Append("</ul>");
        }

        sb.Append("</div></div>");

        return sb.ToString();
    }
}