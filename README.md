# University Planner

![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![macOS](https://img.shields.io/badge/macOS-only-000000?style=flat-square&logo=apple&logoColor=white)

<img width="1214" height="867" alt="image" src="https://github.com/user-attachments/assets/d0963eb9-61c4-45ca-841f-44df821a31e5" />


Aplicación web personal para estudiantes universitarios. Gestiona asignaturas, entregas y exámenes desde un único lugar, con estadísticas, calendario y recordatorios por email.

---

## Stack tecnológico

**Backend**
- .NET 10 — ASP.NET Core Web API
- Entity Framework Core + SQLite
- JWT Bearer Authentication
- MailKit — recordatorios por email
- BCrypt.Net — hash de contraseñas

**Frontend**
- React 19 + Vite + TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Recharts — gráficos de estadísticas
- @dnd-kit/core — drag and drop
- lucide-react — iconos
- @fullcalendar — base del calendario (reemplazado por implementación propia)

---

## Estructura del proyecto

```
UniversityPlanner/
├── Backend/
│   ├── Controllers/        ← endpoints HTTP
│   ├── Data/               ← AppDbContext
│   ├── Enums/              ← Status, ExamType, SubjectColor
│   ├── Migrations/         ← migraciones de EF Core
│   ├── Models/             ← Subject, Assignment, Exam, User
│   ├── Services/           ← EmailService, DailyReminderService
│   └── Program.cs
└── frontend/
    └── src/
        ├── api/            ← instancia de axios
        ├── components/     ← NavBar, Footer, LoginCharacter...
        ├── features/
        │   ├── subjects/   ← api, hooks, components
        │   ├── assignments/
        │   ├── exams/
        │   ├── stats/
        │   └── calendar/
        ├── pages/          ← Dashboard, Subjects, SubjectInfo, Calendar, Login
        └── types/          ← interfaces TypeScript
```

---

## Requisitos previos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org)
- [Git](https://git-scm.com)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/UniversityPlanner.git
cd UniversityPlanner
```

### 2. Configurar el backend

```bash
cd Backend
```

Instalar dependencias:

```bash
dotnet restore
```

Configurar secretos de desarrollo:

```bash
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "tu-clave-secreta-minimo-32-caracteres"
dotnet user-secrets set "Jwt:Issuer" "UniversityPlanner"
dotnet user-secrets set "Email:SmtpServer" "smtp.gmail.com"
dotnet user-secrets set "Email:SmtpPort" "587"
dotnet user-secrets set "Email:SmtpPass" "tu-contraseña-de-aplicacion-gmail"
```

Configurar el usuario inicial (se crea automáticamente al arrancar por primera vez):

```bash
export SETUP_EMAIL="tu@gmail.com"
export SETUP_PASSWORD="tucontraseña"
```

Crear la base de datos:

```bash
dotnet ef database update
```

Arrancar el backend:

```bash
dotnet run
```

El servidor estará disponible en `http://localhost:5063`.  
Swagger UI disponible en `http://localhost:5063/swagger`.

### 3. Configurar el frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

---

## Funcionalidades

### Asignaturas
- CRUD completo con icono y color personalizados por asignatura
- Estadísticas por asignatura (tareas por estado, nota media por examen)
- Drag and drop para eliminar

### Entregas
- CRUD con edición inline en tabla
- Estados: Pendiente, En curso, En revisión, Completada
- Filtrado por asignatura

### Exámenes
- CRUD con edición inline en tabla
- Tipos: Primer parcial, Segundo parcial, Final
- Nota opcional por examen

### Dashboard
- Próximas entregas y exámenes (3 más cercanos)
- Estadísticas generales con gráfico de distribución de tareas

### Calendario
- Vista mensual con entregas y exámenes
- Tooltip con detalles al hacer hover sobre cada evento
- Navegación por mes

### Autenticación
- Usuario único con JWT
- Login con personaje animado interactivo
- Rutas protegidas

### Recordatorios por email
- Email diario a las 8:00 con resumen de entregas y exámenes del día y del día siguiente
- Diseño HTML con los colores de la app

---

## Configuración como servicio en macOS

Para que el backend arranque automáticamente al encender el Mac, crea el archivo de launchd:

```bash
nano ~/Library/LaunchAgents/com.universityplanner.backend.plist
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.universityplanner.backend</string>
    <key>ProgramArguments</key>
    <array>
        <string>/ruta/a/dotnet</string>
        <string>run</string>
        <string>--project</string>
        <string>/ruta/a/UniversityPlanner/Backend</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/universityplanner.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/universityplanner-error.log</string>
</dict>
</plist>
```

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.universityplanner.backend.plist
```

Para el frontend, crea una app con Automator o un script `.app` con este contenido:

```bash
#!/bin/bash
cd /ruta/a/UniversityPlanner/frontend
npm run dev &
sleep 3
open http://localhost:5173
```

---

## Variables de entorno en producción

| Variable | Descripción |
|----------|-------------|
| `SETUP_EMAIL` | Email del usuario administrador |
| `SETUP_PASSWORD` | Contraseña del usuario administrador |
| `Jwt__Key` | Clave secreta para JWT (mínimo 32 caracteres) |
| `Jwt__Issuer` | Issuer del JWT |
| `Email__SmtpServer` | Servidor SMTP (ej. smtp.gmail.com) |
| `Email__SmtpPort` | Puerto SMTP (587 para Gmail) |
| `Email__SmtpPass` | Contraseña de aplicación de Gmail |

---

## Licencia

Proyecto personal de uso privado.
