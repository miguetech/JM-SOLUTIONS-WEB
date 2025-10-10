# JM Solutions Web Platform

**Work smart, not harder**

Main web platform for JM Solutions integrating public site and administrative dashboard for lead management, campaigns, and AI agents.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL 15 (or use Docker)
- Access to microservices: Scraper and IA

### Installation

1. Clone the repository
```bash
cd JM-SOLUTIONS-WEB
```

2. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Start with Docker
```bash
docker-compose up -d
```

## 📁 Project Structure

```
JM-SOLUTIONS-WEB/
├── frontend/              # Next.js + React + TypeScript
│   ├── src/app/admin/    # Administrative dashboard
│   ├── src/components/   # Reusable components
│   └── src/services/     # API services
├── backend/              # Express + Node.js + TypeScript
│   ├── src/controllers/  # Route controllers
│   ├── src/services/     # Business logic
│   └── src/routes/       # Route definitions
├── docker-compose.yml    # Service orchestration
└── CLAUDE.md            # Complete technical documentation
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Dashboard**: http://localhost:3000/admin
- **PostgreSQL**: localhost:5433

## 🎯 Features

### Administrative Dashboard
- **Overview**: General metrics, trends, and recent activity
- **Scraper Management**: Lead scraper control and monitoring
  - Start/stop scraping sessions
  - Configure parameters (location, categories, limits)
  - Real-time progress monitoring
  - Session history
- **IA Agents**: AI agent management
  - Individual agent status and control
  - System prompt and parameter configuration
  - Cost and token usage monitoring
  - Activity logs
- **Database**: Data visualization and analysis
  - Companies and opportunities
  - Statistics and metrics

## 🔗 Microservice Integration

### Scraper Service
- **URL**: http://jm-solutions-lead-scraper:8000
- **Functions**: Google Maps lead search and scraping
- **Endpoints**: `/api/v1/jobs`, `/api/v1/jobs/{job_id}`

### IA Service
- **URL**: http://jm-solutions-ia-service:8001
- **Functions**: CrewAI agents for analysis and automation
- **Endpoints**: `/agents/status`, `/agents/{id}/config`, `/logs`

## 🛠️ Technologies

### Frontend
- React 18 + Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide icons

### Backend
- Node.js 18 + Express
- TypeScript
- JWT Authentication
- Axios for microservice communication

### Database
- PostgreSQL 15 with pgvector
- Prisma ORM (optional)

### Infrastructure
- Docker + Docker Compose
- Network: jm-solutions-network

## 📚 Documentation

See [CLAUDE.md](./CLAUDE.md) for complete technical documentation.

## 🔧 Development

### Service Structure
```typescript
// Frontend services
- adminService: Dashboard metrics and analytics
- scraperService: Scraper control
- iaService: AI agent management

// Backend services
- admin.service: Metrics and statistics
- scraper.service: Proxy to scraper microservice
- ia.service: Proxy to IA microservice
```

### Environment Variables
```env
# Backend
DATABASE_URL=postgresql://user:pass@host:5433/db
JWT_SECRET=your-secret-key
SCRAPER_SERVICE_URL=http://jm-solutions-lead-scraper:8000
IA_SERVICE_URL=http://jm-solutions-ia-service:8001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📄 License

Property of JM Solutions © 2024
