# CLAUDE.md - JM Solutions Web Platform

## 1. Visión General del Proyecto

### Descripción del Proyecto

**JM Solutions Web** es la plataforma web principal que actúa como:
- **Ventana digital al mundo**: Sitio web público que presenta los servicios de JM Solutions
- **Dashboard de orquestación**: Panel de control centralizado para gestionar todos los microservicios
- **Centro de operaciones**: Interfaz para administrar leads, campañas, análisis y agentes IA

Este proyecto es el punto de entrada principal para clientes y el centro de control para operaciones internas.

### Modelo de Negocio

**JM Solutions** ofrece servicios digitales especializados con IA y automatización:

1. **Auditoría Digital** - Análisis profundo de presencia web, SEO, seguridad y oportunidades de mejora
2. **Automatizaciones** - Implementación de flujos de trabajo inteligentes que reducen tareas manuales
3. **Desarrollo Web** - Sitios y aplicaciones optimizadas para conversión y experiencia de usuario
4. **Agentes IA** - Asistentes inteligentes personalizados para atención al cliente y procesos internos
5. **Software as a Service (SaaS)** - Plataformas especializadas para gestión de leads y análisis de mercado

### Posicionamiento y Copywriting

**Lema**: "Work smart, not harder"

**Principios de Marketing**:
- **Resultados Medibles**: Enfoque en ROI y métricas concretas
- **Automatización Inteligente**: IA como ventaja competitiva
- **Transparencia**: Acceso completo a métricas y reportes
- **Educación del Cliente**: Contenido educativo sobre cada servicio

---

## 2. Arquitectura de Microservicios

### Ecosistema Completo

```
JM-SOLUTIONS-MICROSERVICES/
├── JM-SOLUTIONS-WEB/          # Este proyecto (Frontend + Backend)
├── JM-SOLUTIONS-DB/           # Base de datos PostgreSQL + pgAdmin
├── JM-SOLUCTIONS-scrapper-web/# Scraper de leads con IA
└── JM-SOLUTIONS-IA/           # Agentes IA con CrewAI
```

### 1. JM-SOLUTIONS-WEB (Este Proyecto)

**Función**: Plataforma web pública y dashboard administrativo

**Tecnologías**:
- **Frontend**: React, TypeScript, Next.js, Shadcn/ui, Tailwind CSS, React Icons, React Bits
- **Backend**: Node.js, TypeScript, Express, Passport.js, JWT, Helmet, bcrypt
- **Infraestructura**: Docker, Docker Compose

**Responsabilidades**: 
- Sitio web público con información de servicios
- Dashboard para gestión de leads y campañas
- Orquestación de llamadas a otros microservicios
- Autenticación y autorización de usuarios
- Visualización de datos y analytics

### 2. JM-SOLUTIONS-DB

**Función**: Base de datos centralizada PostgreSQL con pgvector

**Tecnologías**: PostgreSQL 15, pgvector, pgAdmin 4, Docker

**Esquema de 9 Tablas**:
- `companies` - Entidades de negocio
- `company_contacts` - Información de contacto
- `company_social_profiles` - Presencia en redes sociales
- `company_web_analysis` - Análisis de sitios web
- `sales_opportunities` - Lead scoring y oportunidades
- `outreach_communications` - Historial de comunicaciones
- `ai_embeddings` - Vectores para búsqueda semántica
- `market_analysis` - Inteligencia competitiva
- `scraping_sessions` - Tracking de sesiones

**Conexión**:
```bash
# Desde host
postgresql://jm_admin:password@localhost:5433/jm_solutions

# Desde contenedores Docker
postgresql://jm_admin:password@postgres:5432/jm_solutions
```

### 3. JM-SOLUCTIONS-scrapper-web

**Función**: Sistema avanzado de generación de leads

**Tecnologías**: Python 3.11, Chrome DevTools MCP, Google Places API, Serper API

**Características**:
- Scraping multi-fuente (Google Places, Serper, Web)
- Análisis de sitios web con JavaScript ejecutado
- Detección y análisis de WordPress
- Lead scoring unificado
- Integración automática con base de datos

**Nichos Soportados**: Abogados, Restaurantes, Inmobiliarias, Automotriz, Servicios Digitales, Ropa

### 4. JM-SOLUTIONS-IA

**Función**: Agentes IA autónomos con CrewAI

**Tecnologías**: Python 3.11, CrewAI, Google Gemini API, Context7 MCP

**Agentes Principales**:
- Database Search Agent - Búsqueda y filtrado de empresas
- Lead Qualification Agent - Calificación de oportunidades
- Outreach Agent - Contacto automatizado (email, WhatsApp)
- Web Research Agent - Investigación adicional
- Customer Service Agent - Atención a consultas
- Meeting Coordinator Agent - Gestión de citas
- Sales Closer Agent - Cierre de ventas

**Estrategia de Costos**:
- Gemini Flash-8B: $0.0375/$0.15 por 1M tokens (tareas simples)
- Gemini Flash: $0.075/$0.30 por 1M tokens (tareas moderadas)
- Gemini Pro: $1.25/$5.00 por 1M tokens (análisis complejos)

---

## 3. Estructura del Proyecto JM-SOLUTIONS-WEB

### Arquitectura de Carpetas

```
JM-SOLUTIONS-WEB/
├── frontend/                   # Aplicación React + Next.js
│   ├── src/
│   │   ├── app/               # App Router de Next.js
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── ui/           # Componentes Shadcn/ui
│   │   │   ├── dashboard/    # Componentes del dashboard
│   │   │   ├── landing/      # Componentes del sitio público
│   │   │   └── shared/       # Componentes compartidos
│   │   ├── lib/              # Utilidades y helpers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # Servicios API
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # Estilos globales
│   ├── public/               # Assets estáticos
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                    # API Node.js + Express
│   ├── src/
│   │   ├── controllers/      # Controladores de rutas
│   │   ├── models/           # Modelos de datos
│   │   ├── routes/           # Definición de rutas
│   │   ├── middleware/       # Middleware (auth, validation)
│   │   ├── services/         # Lógica de negocio
│   │   │   ├── database.service.ts
│   │   │   ├── scraper.service.ts
│   │   │   ├── ai.service.ts
│   │   │   └── email.service.ts
│   │   ├── utils/            # Utilidades
│   │   ├── config/           # Configuración
│   │   └── server.ts         # Punto de entrada
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── docker-compose.yml          # Orquestación de contenedores
├── .env.example               # Template de variables de entorno
├── CLAUDE.md                  # Este archivo
└── README.md                  # Documentación de usuario
```

---

## 4. Guía de Estilo y UX/UI

### Identidad de Marca

**Nombre**: JM Solutions  
**Posicionamiento**: Soluciones digitales inteligentes con IA y automatización  
**Tono**: Profesional, técnico, orientado a resultados, transparente  
**Lema**: "Work smart, not harder"

### Paleta de Colores

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0D47A1',      // Azul Oscuro - Seriedad/Confianza
        'accent-blue': '#00BFFF',       // Azul Eléctrico - Destacar/CTAs
        'background-dark': '#0A0A0A',   // Negro - Fondo principal
        'text-light': '#B0BEC5',        // Gris Claro - Texto en fondo oscuro
        'secondary-dark': '#424242',    // Gris Oscuro - Fondos secundarios/cards
      }
    }
  }
}
```

**Uso de Colores**:
- Fondos principales: `background-dark` (#0A0A0A)
- Fondos de cards/secciones: `secondary-dark` (#424242)
- Botones primarios: `primary-dark` (#0D47A1)
- Botones de acción/CTAs: `accent-blue` (#00BFFF)
- Texto sobre fondos oscuros: `text-light` (#B0BEC5)
- Títulos/destacados: `accent-blue` o blanco (#FFFFFF)

### Tipografía

**Fuentes Principales**:

1. **Exo 2** (Títulos y Destacados)
   - Uso: H1, H2, H3, botones, navegación
   - Pesos: 600 (SemiBold), 700 (Bold)
   - Importar: Google Fonts

2. **Lato** (Subtítulos y Texto Normal)
   - Uso: Párrafos, subtítulos, formularios, tablas
   - Pesos: 400 (Regular), 700 (Bold)
   - Importar: Google Fonts

**Jerarquía Tipográfica**:

```css
/* Títulos */
h1 { font-family: 'Exo 2', sans-serif; font-size: 3rem; font-weight: 700; }
h2 { font-family: 'Exo 2', sans-serif; font-size: 2.25rem; font-weight: 600; }
h3 { font-family: 'Exo 2', sans-serif; font-size: 1.875rem; font-weight: 600; }

/* Texto */
body { font-family: 'Lato', sans-serif; font-size: 1rem; font-weight: 400; }
p { font-family: 'Lato', sans-serif; line-height: 1.6; }
```

### Principios de UX/UI

1. **Claridad de Datos**: Tablas y gráficos legibles con alto contraste
2. **Jerarquía Visual**: Tamaños de fuente y colores para guiar la atención
3. **Espaciado Generoso**: Evitar saturación visual
4. **Feedback Inmediato**: Loaders, toasts y estados de carga visibles
5. **Accesibilidad**: Contraste WCAG AA mínimo, navegación por teclado
6. **Responsive Design**: Mobile-first approach
7. **Animaciones Sutiles**: Transiciones suaves sin distracciones

---

## 5. Stack Tecnológico Detallado

### Frontend

**Framework y Librerías**:
- **React 18+**: Librería UI con hooks y concurrent features
- **Next.js 14+**: Framework React con App Router, SSR, SSG
- **TypeScript 5+**: Tipado estático para mayor seguridad
- **Tailwind CSS 3+**: Utility-first CSS framework
- **Shadcn/ui**: Componentes accesibles y personalizables
- **React Icons**: Iconos de múltiples librerías
- **React Bits**: Componentes adicionales de UI

**Gestión de Estado**:
- **React Context API**: Estado global ligero
- **React Query / TanStack Query**: Gestión de estado del servidor
- **Zustand** (opcional): Estado global más complejo

**Formularios y Validación**:
- **React Hook Form**: Gestión de formularios performante
- **Zod**: Validación de esquemas TypeScript-first

**Gráficos y Visualización**:
- **Recharts**: Gráficos para dashboards
- **Chart.js**: Alternativa para gráficos complejos

### Backend

**Framework y Librerías**:
- **Node.js 18+**: Runtime JavaScript
- **Express 4+**: Framework web minimalista
- **TypeScript 5+**: Tipado estático

**Seguridad**:
- **Helmet**: Headers de seguridad HTTP
- **Passport.js**: Autenticación flexible
- **bcrypt**: Hashing de contraseñas
- **jsonwebtoken**: Tokens JWT para autenticación
- **express-rate-limit**: Rate limiting para APIs
- **cors**: Control de CORS

**Base de Datos**:
- **pg**: Cliente PostgreSQL para Node.js
- **TypeORM** o **Prisma**: ORM para TypeScript

**Comunicación**:
- **Nodemailer**: Envío de emails
- **Axios**: Cliente HTTP para llamadas a microservicios

**Utilidades**:
- **dotenv**: Variables de entorno
- **winston**: Logging avanzado
- **joi**: Validación de datos

### DevOps

- **Docker**: Containerización
- **Docker Compose**: Orquestación multi-contenedor
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Husky**: Git hooks
- **Jest**: Testing unitario
- **Cypress**: Testing E2E

---

## 6. Configuración Inicial del Proyecto

### Paso 1: Verificar Prerequisitos

```bash
# Verificar Node.js (v18+)
node --version

# Verificar npm
npm --version

# Verificar Docker
docker --version
docker-compose --version

# Verificar que la base de datos esté corriendo
cd ../JM-SOLUTIONS-DB
docker-compose ps
```

### Paso 2: Configurar Variables de Entorno

```bash
# En la raíz del proyecto
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

**Variables de Entorno Requeridas**:

```bash
# Backend
NODE_ENV=development
PORT=3001
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Database
DATABASE_URL=postgresql://jm_admin:password@localhost:5433/jm_solutions

# Microservices URLs
SCRAPER_SERVICE_URL=http://localhost:8000
IA_SERVICE_URL=http://localhost:8001

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Paso 3: Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Paso 4: Inicializar Base de Datos

```bash
# Asegurarse de que la DB esté corriendo
cd ../../JM-SOLUTIONS-DB
docker-compose up -d postgres

# Verificar conexión
docker exec -it jm-solutions-postgres-db psql -U jm_admin -d jm_solutions -c "\dt"
```

### Paso 5: Ejecutar en Desarrollo

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**URLs de Desarrollo**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Base de Datos: localhost:5433

---

## 7. Comandos de Desarrollo

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Formateo
npm run format

# Testing
npm test
npm run test:watch
npm run test:coverage
```

### Backend

```bash
# Desarrollo con hot-reload
npm run dev

# Build TypeScript
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Testing
npm test
npm run test:watch

# Verificar tipos TypeScript
npm run type-check
```

### Docker

```bash
# Construir imágenes
docker-compose build

# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reiniciar un servicio específico
docker-compose restart frontend
docker-compose restart backend
```

---

## 8. Integración con Microservicios

### Comunicación con JM-SOLUTIONS-DB

```typescript
// backend/src/services/database.service.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});

export class DatabaseService {
  async getCompanies(filters: any) {
    const query = `
      SELECT c.*, so.opportunity_score, so.opportunity_level
      FROM companies c
      LEFT JOIN sales_opportunities so ON c.business_id = so.business_id
      WHERE c.search_keywords ILIKE $1
      ORDER BY so.opportunity_score DESC
      LIMIT $2
    `;
    return pool.query(query, [`%${filters.keyword}%`, filters.limit]);
  }
}
```

### Comunicación con JM-SOLUCTIONS-scrapper-web

```typescript
// backend/src/services/scraper.service.ts
import axios from 'axios';

export class ScraperService {
  private baseURL = process.env.SCRAPER_SERVICE_URL;

  async triggerScraping(params: {
    keywords: string[];
    locations: string[];
    maxPerLocation: number;
  }) {
    return axios.post(`${this.baseURL}/api/v1/scrape`, params);
  }

  async getScrapingStatus(sessionId: string) {
    return axios.get(`${this.baseURL}/api/v1/status/${sessionId}`);
  }
}
```

### Comunicación con JM-SOLUTIONS-IA

```typescript
// backend/src/services/ai.service.ts
import axios from 'axios';

export class AIService {
  private baseURL = process.env.IA_SERVICE_URL;

  async qualifyLead(companyId: string) {
    return axios.post(`${this.baseURL}/api/v1/qualify`, { companyId });
  }

  async scheduleOutreach(companyIds: string[]) {
    return axios.post(`${this.baseURL}/api/v1/outreach/schedule`, {
      companyIds,
    });
  }

  async getAgentStatus() {
    return axios.get(`${this.baseURL}/api/v1/agents/status`);
  }
}
```

---

## 9. Estructura de Componentes Frontend

### Componentes del Dashboard

```typescript
// src/components/dashboard/LeadsTable.tsx
import { DataTable } from '@/components/ui/data-table';

export function LeadsTable({ data }) {
  const columns = [
    { accessorKey: 'name', header: 'Empresa' },
    { accessorKey: 'rating', header: 'Rating' },
    { accessorKey: 'opportunity_score', header: 'Score' },
    { accessorKey: 'opportunity_level', header: 'Nivel' },
  ];

  return <DataTable columns={columns} data={data} />;
}
```

### Componentes del Landing

```typescript
// src/components/landing/Hero.tsx
export function Hero() {
  return (
    <section className="bg-background-dark text-text-light">
      <h1 className="font-exo text-accent-blue">
        Work Smart, Not Harder
      </h1>
      <p className="font-lato">
        Soluciones digitales inteligentes con IA y automatización
      </p>
    </section>
  );
}
```

---

## 10. Convenciones de Código

### TypeScript

- Usar `interface` para objetos públicos
- Usar `type` para uniones y tipos complejos
- Nombrar interfaces con prefijo `I` (opcional)
- Usar `enum` para constantes relacionadas

### React

- Componentes funcionales con hooks
- Props destructuring en parámetros
- Usar `React.FC` o tipado explícito
- Custom hooks con prefijo `use`

### Naming Conventions

- Archivos: `kebab-case.tsx`
- Componentes: `PascalCase`
- Funciones: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Interfaces: `PascalCase` (con o sin `I`)

### Estructura de Archivos

```typescript
// Orden de imports
import React from 'react';                    // 1. React
import { useRouter } from 'next/navigation';  // 2. Next.js
import axios from 'axios';                    // 3. Librerías externas
import { Button } from '@/components/ui';     // 4. Componentes internos
import { formatDate } from '@/lib/utils';     // 5. Utilidades
import type { Company } from '@/types';       // 6. Types
import './styles.css';                        // 7. Estilos
```

---

## 11. Testing

### Testing Unitario (Jest)

```typescript
// __tests__/services/database.service.test.ts
import { DatabaseService } from '@/services/database.service';

describe('DatabaseService', () => {
  it('should fetch companies with filters', async () => {
    const service = new DatabaseService();
    const result = await service.getCompanies({
      keyword: 'abogados',
      limit: 10,
    });
    expect(result.rows).toBeDefined();
  });
});
```

### Testing E2E (Cypress)

```typescript
// cypress/e2e/dashboard.cy.ts
describe('Dashboard', () => {
  it('should display leads table', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="leads-table"]').should('be.visible');
  });
});
```

---

## 12. Deployment

### Docker Production

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
```

### Variables de Entorno Producción

```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/jm_solutions
JWT_SECRET=strong_production_secret
NEXT_PUBLIC_API_URL=https://api.jm-solutions.com
```

---

## 13. Roadmap de Desarrollo

### Fase 1: Fundación (Semanas 1-2)
- ✅ Configuración inicial del proyecto
- ✅ Estructura de carpetas y arquitectura
- ✅ Configuración de Docker
- ✅ Setup de TypeScript y ESLint
- ✅ Integración con base de datos

### Fase 2: Landing Page (Semanas 3-4)
- [ ] Hero section con branding
- [ ] Sección de servicios
- [ ] Testimonios y casos de éxito
- [ ] Formulario de contacto
- [ ] Footer con información

### Fase 3: Dashboard Básico (Semanas 5-6)
- [ ] Autenticación y autorización
- [ ] Vista de leads
- [ ] Filtros y búsqueda
- [ ] Detalles de empresa
- [ ] Exportación de datos

### Fase 4: Orquestación de Microservicios (Semanas 7-8)
- [ ] Integración con scraper
- [ ] Integración con agentes IA
- [ ] Panel de control de scraping
- [ ] Panel de control de agentes
- [ ] Monitoreo en tiempo real

### Fase 5: Analytics y Reportes (Semanas 9-10)
- [ ] Dashboard de métricas
- [ ] Gráficos y visualizaciones
- [ ] Reportes personalizados
- [ ] Exportación de reportes
- [ ] Alertas y notificaciones

---

## 14. Recursos y Documentación

### Documentación Oficial
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs
- **Express**: https://expressjs.com
- **PostgreSQL**: https://www.postgresql.org/docs

### Recursos de Diseño
- **Google Fonts**: https://fonts.google.com
- **React Icons**: https://react-icons.github.io/react-icons
- **Tailwind UI**: https://tailwindui.com
- **Heroicons**: https://heroicons.com

### Herramientas de Desarrollo
- **VS Code**: Editor recomendado
- **Postman**: Testing de APIs
- **pgAdmin**: Gestión de base de datos
- **Docker Desktop**: Gestión de contenedores

---

**Última Actualización**: 2025-01-07  
**Versión del Documento**: 2.0  
**Mantenedor**: JM Solutions Development Team
