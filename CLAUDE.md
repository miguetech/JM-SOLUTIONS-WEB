# CLAUDE.md - JM Solutions Admin Dashboard Development Guide

## Project Overview

This is the **JM Solutions Web Platform** - a comprehensive admin dashboard for managing the complete microservices ecosystem. The dashboard provides secure admin controls for:

- **Scraper Management**: Control and monitor the lead generation system
- **IA Agents Control**: Manage and monitor autonomous AI agents
- **Data Visualization**: Comprehensive views of leads, opportunities, and metrics
- **Security**: Multi-factor authentication and role-based access control

## 🏗️ Architecture Overview

### Microservices Integration
```
JM-SOLUTIONS-WEB (This Project)
├── Frontend: Next.js 14 + React + TypeScript + Shadcn/ui
├── Backend: Node.js + Express + TypeScript + JWT + Passport.js
└── Integration with:
    ├── JM-SOLUTIONS-DB (PostgreSQL + 9 tables)
    ├── JM-SOLUTIONS-Scrapper-web (Python + Chrome MCP)
    └── JM-SOLUTIONS-IA (CrewAI + Gemini API)
```

### Database Schema (9 Core Tables)
- `companies` - Main business entities with Google Places data
- `company_contacts` - Email, phone, WhatsApp contacts  
- `company_social_profiles` - Social media presence analysis
- `company_web_analysis` - Website SEO, security, performance scores
- `sales_opportunities` - Lead scoring and opportunity classification
- `outreach_communications` - Communication history and tracking
- `ai_embeddings` - Vector embeddings for AI similarity search
- `market_analysis` - Competitive intelligence and market insights
- `scraping_sessions` - Session tracking and performance metrics

## 🎨 Design System

### Color Palette (Already Implemented)
```typescript
colors: {
  'primary-dark': '#0D47A1',      // Main buttons, branding
  'accent-blue': '#00BFFF',       // CTAs, highlights, active states
  'background-dark': '#0A0A0A',   // Main background
  'text-light': '#B0BEC5',        // Primary text
  'secondary-dark': '#424242',    // Cards, sections, borders
}
```

### Typography (Already Configured)
- **Headers**: Exo 2 (600/700 weight)
- **Body**: Lato (400/700 weight)
- **Google Fonts**: Already imported in globals.css

### Component Library
**Shadcn/ui components to use:**
- Card, Badge, Button, Progress, Alert
- DataTable, Select, Switch, Input
- Dialog, Sheet, Popover, Tooltip
- Charts (Recharts integration)

## 🔐 Authentication System

### Current Implementation
- **JWT tokens** with Passport.js (backend/src/middleware/auth.ts)
- **Frontend service** (frontend/src/services/auth.service.ts)
- **Token storage** in localStorage

### Admin Dashboard Requirements
- **Role-based access**: Super Admin, IA Admin, Scraper Admin, Viewer
- **2FA authentication** for admin users
- **Session management** with auto-logout
- **Audit logging** for all admin actions

## 📊 Dashboard Structure

### 1. Main Dashboard Route: `/admin`
```
/admin
├── /overview          # Main metrics and KPIs
├── /scraper          # Scraper control panel
├── /ia-agents        # IA agents management
├── /database         # Data explorer and analytics
├── /settings         # Admin settings and user management
└── /logs             # System logs and audit trails
```

### 2. Component Structure
```
src/components/admin/
├── layout/
│   ├── AdminLayout.tsx
│   ├── AdminSidebar.tsx
│   └── AdminHeader.tsx
├── overview/
│   ├── MetricsCards.tsx
│   ├── PerformanceCharts.tsx
│   └── RecentActivity.tsx
├── scraper/
│   ├── ScraperControls.tsx
│   ├── SessionMonitor.tsx
│   └── ConfigurationPanel.tsx
├── ia-agents/
│   ├── AgentsStatus.tsx
│   ├── CostMonitor.tsx
│   └── AgentLogs.tsx
└── database/
    ├── CompaniesTable.tsx
    ├── OpportunitiesView.tsx
    └── AnalyticsCharts.tsx
```

## 🔌 Microservices Integration

### Backend API Endpoints
```typescript
// Scraper Integration
POST /api/admin/scraper/start
POST /api/admin/scraper/stop  
GET  /api/admin/scraper/status
GET  /api/admin/scraper/sessions

// IA Agents Integration
GET  /api/admin/ia/agents/status
GET  /api/admin/ia/costs
POST /api/admin/ia/agents/restart
GET  /api/admin/ia/logs

// Database Analytics
GET  /api/admin/database/metrics
GET  /api/admin/database/companies
GET  /api/admin/database/opportunities
```

### Service Layer Structure
```typescript
// backend/src/services/
├── scraper.service.ts    # Integration with Scrapper microservice
├── ia.service.ts         # Integration with IA microservice
├── database.service.ts   # Direct PostgreSQL queries
├── analytics.service.ts  # Data aggregation and metrics
└── admin.service.ts      # Admin-specific operations
```

## 🚀 Development Workflow

### Setup Commands
```bash
# Backend setup
cd backend
npm install
npm run dev     # Starts on :3001

# Frontend setup  
cd frontend
npm install
npm run dev     # Starts on :3000

# Database check
cd ../JM-SOLUTIONS-DB
docker compose ps  # Verify PostgreSQL is running
```

### Development Environment
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001  
- **Database**: localhost:5433 (PostgreSQL)
- **pgAdmin**: http://localhost:8080

## 📦 Required Dependencies

### Frontend (Already Installed)
- ✅ Next.js 14, React 18, TypeScript
- ✅ Tailwind CSS, Lucide React, React Icons
- ✅ Class Variance Authority, CLSX, Tailwind Merge
- 🔄 **Need to Add**: Recharts, React Hook Form, Zod

### Backend (Already Installed)  
- ✅ Express, TypeScript, CORS, Helmet
- ✅ Passport.js, JWT, bcryptjs
- ✅ PostgreSQL (pg), Express Validator
- 🔄 **Need to Add**: Axios (microservices calls), Winston (logging)

### Install Missing Dependencies
```bash
# Frontend additions
cd frontend
npm install recharts react-hook-form @hookform/resolvers zod @radix-ui/react-dialog @radix-ui/react-select

# Backend additions  
cd backend
npm install axios winston node-cron
npm install -D @types/node-cron
```

## 🔧 Key Implementation Patterns

### 1. Secure API Calls
```typescript
// All admin endpoints require authentication
app.use('/api/admin', authenticateToken, adminMiddleware);

// Role-based middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

### 2. Real-time Updates
```typescript
// WebSocket connection for live metrics
const wsConnection = new WebSocket('ws://localhost:3001/admin-ws');
wsConnection.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateDashboardMetrics(data);
};
```

### 3. Error Handling
```typescript
// Centralized error handling for admin operations
const withErrorHandling = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error('Admin operation failed:', error);
    toast.error('Operation failed. Please try again.');
    throw error;
  }
};
```

## 🎯 Development Priorities

### Phase 1: Foundation (In Progress)
- ✅ Design system analysis
- 🔄 Admin routing structure
- 🔄 Layout components
- 🔄 Authentication enhancement

### Phase 2: Core Features
- 🔄 Scraper control panel
- 🔄 IA agents monitoring
- 🔄 Database analytics
- 🔄 Real-time metrics

### Phase 3: Advanced Features
- 🔄 Advanced visualizations
- 🔄 Audit logging
- 🔄 Security enhancements
- 🔄 Performance optimization

## 🔍 Testing Strategy

### Component Testing
```bash
# Test admin components
npm test -- --testPathPattern=admin

# Test API endpoints
npm run test:api -- --grep="admin"
```

### Security Testing
- Authentication flow validation
- Role-based access verification
- API rate limiting tests
- SQL injection prevention

## 🚀 Deployment Considerations

### Environment Variables
```bash
# Admin-specific variables
ADMIN_JWT_SECRET=strong_admin_secret
ADMIN_SESSION_TIMEOUT=3600000
SCRAPER_SERVICE_URL=http://scraper:8000
IA_SERVICE_URL=http://ia:8001
DATABASE_URL=postgresql://user:pass@postgres:5432/jm_solutions
```

### Docker Configuration
```yaml
# docker-compose.yml additions for admin dashboard
admin-web:
  build: ./frontend
  environment:
    - NEXT_PUBLIC_ADMIN_MODE=true
    - NEXT_PUBLIC_API_URL=http://backend:3001
  depends_on:
    - backend
    - postgres
```

## 📚 Documentation and Resources

### API Documentation
- Swagger/OpenAPI spec for admin endpoints
- Postman collection for testing
- Integration guides for each microservice

### Component Documentation  
- Storybook for UI components
- Usage examples and best practices
- Design system guidelines

---

**Last Updated**: 2025-10-09  
**Version**: 1.0  
**Maintainer**: JM Solutions Development Team

**🎯 Current Focus**: Building secure admin dashboard with real-time monitoring of scraper and IA agents across the microservices ecosystem.