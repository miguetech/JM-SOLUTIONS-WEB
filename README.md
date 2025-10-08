# JM Solutions Web Platform

**Work smart, not harder**

Plataforma web principal de JM Solutions que integra sitio público y dashboard administrativo para gestión de leads, campañas y agentes IA.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 15 (o usar Docker)

### Instalación

1. Clonar el repositorio
```bash
cd JM-SOLUTIONS-WEB
```

2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

3. Instalar dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Iniciar con Docker
```bash
docker-compose up -d
```

O iniciar manualmente:
```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

## 📁 Estructura del Proyecto

```
JM-SOLUTIONS-WEB/
├── frontend/          # Next.js + React + TypeScript
├── backend/           # Express + Node.js + TypeScript
├── docker-compose.yml # Orquestación de servicios
└── CLAUDE.md         # Documentación técnica completa
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **PostgreSQL**: localhost:5433

## 📚 Documentación

Ver [CLAUDE.md](./CLAUDE.md) para documentación técnica completa.

## 🛠️ Tecnologías

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript, JWT, Passport.js
- **Base de Datos**: PostgreSQL 15 con pgvector
- **Infraestructura**: Docker, Docker Compose

## 📄 Licencia

Propiedad de JM Solutions © 2024
