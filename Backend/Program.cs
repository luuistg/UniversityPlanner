using Backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add DB Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=universityplanner.db"));

builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddSingleton<EmailService>();
builder.Services.AddHostedService<DailyReminderService>();

// Allow frontend to access the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

var app = builder.Build();

// Setup inicial — crea el usuario si no existe
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); // aplica migraciones automáticamente

    if (!db.Users.Any())
    {
        var email = Environment.GetEnvironmentVariable("SETUP_EMAIL");
        var password = Environment.GetEnvironmentVariable("SETUP_PASSWORD");

        if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
        {
            db.Users.Add(new Backend.Models.User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
            });
            db.SaveChanges();
            Console.WriteLine($"Usuario creado: {email}");
        }
        else
        {
            Console.WriteLine("⚠️ No se encontraron SETUP_EMAIL y SETUP_PASSWORD en las variables de entorno.");
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
