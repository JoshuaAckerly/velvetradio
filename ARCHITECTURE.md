# VelvetRadio Architecture Documentation

This document provides an overview of the VelvetRadio application architecture, design patterns, and technical decisions.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Technology Stack](#technology-stack)
- [Application Layers](#application-layers)
- [Design Decisions](#design-decisions)
- [Performance Considerations](#performance-considerations)

## 🎯 System Overview

VelvetRadio is a full-stack web application built with **Laravel 11 backend** and **React 18 frontend**, emphasizing **radio streaming, messaging, and user engagement.**

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │          React 18 + TypeScript Frontend          │  │
│  │  (Inertia.js Client / Vite HMR / Tailwind CSS)  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Web Server (Nginx)                       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│               PHP-FPM / Laravel 11 Backend               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Controllers → Services → Models → Database      │  │
│  │  Streaming, Messaging, User Management           │  │
│  └──────────────────────────────────────────────────┘  │
└─────┬───────────────┬──────────────────────────────────┘
      │               │
┌─────▼────┐     ┌───▼──────────┐
│   MySQL  │     │  File        │
│          │     │  Storage     │
└──────────┘     └──────────────┘
```

### Core Principles

1. **Stream-First**: Built for radio streaming functionality
2. **Message-Driven**: Integrated messaging system
3. **User Engagement**: Focus on listener interaction
4. **Type Safety**: Full TypeScript support
5. **Maintainable**: Clean architecture for long-term sustainability

## 🏗️ Architecture Patterns

### 1. Model-View-Controller (MVC)

- **Models** (`app/Models/`): Data structures and database interactions
- **Views** (`resources/js/Pages/`): React components via Inertia.js
- **Controllers** (`app/Http/Controllers/`): Request handling

### 2. Service Layer Pattern

Business logic encapsulation:

```
Controller → Service → Model → Database
     ↓
  Streaming/Queue
```

### 3. Message Proxy Pattern

Unified message handling:

```
Message Request → MessageProxyController → AuthSystemService
```

### 4. Repository Pattern

Data access abstraction for flexibility.

### 5. Component-Driven Frontend

```
resources/js/
├── Components/       # Reusable UI components
├── Layouts/         # Page layouts
├── Pages/           # Full-page components
└── types/           # TypeScript definitions
```

## 🛠️ Technology Stack

### Backend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Laravel 11 | Application framework |
| **Language** | PHP 8.1+ | Server-side programming |
| **Database** | MySQL 8.0+ | Data storage |
| **Cache** | File/Redis | Session and caching |
| **Queue** | Laravel Queue | Background job processing |
| **Static Analysis** | PHPStan | Code quality checking |

### Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18 | UI library |
| **Language** | TypeScript 5.x | Type-safe JavaScript |
| **Build Tool** | Vite | Development & bundling |
| **Routing** | Inertia.js 2 | Full-stack SPA |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Radix UI, Headless UI | Accessible primitives |

### Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Web Server** | Nginx | HTTP server & reverse proxy |
| **Process Manager** | Supervisor (optional) | Queue worker management |
| **SSL** | Let's Encrypt | HTTPS support |

## 📚 Application Layers

### 1. Presentation Layer

**Responsibilities**: User interface, request handling, response formatting

**Components**:
- Inertia Pages (`resources/js/Pages/`)
- React Components (`resources/js/Components/`)
- Controllers (`app/Http/Controllers/`)

### 2. Application Layer

**Responsibilities**: Business logic and workflows

**Components**:
- Services (`app/Services/`)
- Form Requests (`app/Http/Requests/`)
- Middleware (`app/Http/Middleware/`)
- Jobs (`app/Jobs/`)

### 3. Domain Layer

**Responsibilities**: Core business entities

**Components**:
- Models (`app/Models/`)
- Contracts (`app/Contracts/`)
- Events (`app/Events/`)

### 4. Infrastructure Layer

**Responsibilities**: Data persistence and external services

**Components**:
- Database Migrations (`database/migrations/`)
- Seeders (`database/seeders/`)
- Configuration (`config/`)
- Providers (`app/Providers/`)

## 🎯 Core Features

### Messaging System

- User message retrieval with authentication
- Message read status tracking
- Bulk read operations
- Shared auth-system integration

### Streaming Infrastructure

- Foundation for radio streaming
- Queue management for background tasks
- Media asset storage
- User interaction tracking

### User Management

- User authentication
- User preferences
- Activity tracking

## 🔄 Data Flow

### Standard Request Flow

```
1. Browser requests page
2. Nginx → PHP-FPM → Laravel Router
3. Controller processes request
4. Service handles business logic
5. Model queries database
6. Inertia renders page
7. React app hydrates
8. User interacts with page
```

### Message Retrieval Flow

```
Authenticated User → API Request → MessageProxyController
                        ↓
                AuthSystemService provides data
                        ↓
                Messages returned as JSON
                        ↓
                React renders message list
```

## 🎨 Design Decisions

### Why Service Layer?

- Encapsulates streaming and messaging logic
- Makes testing easier
- Enables code reuse
- Facilitates future API development

### Message Proxy Pattern

- Centralized authentication via shared auth-system
- Consistent message handling
- Reduced code duplication

### Database Choice

- **MySQL**: Robust and time-tested
- **Scalable**: Handles large user bases
- **Flexible**: Easy schema evolution for streaming features

### Why React 18?

- Stable and widely adopted
- Native TypeScript support
- Great ecosystem for media players
- Concurrent rendering improvements

## 🔒 Security Architecture

### Input Validation

- Form Request validation
- Database query parameterization
- XSS protection via React

### Authentication

- Shared auth-system integration
- Session management
- Bearer token support

### Data Protection

- CSRF protection (Laravel middleware)
- SQL injection prevention
- Rate limiting on endpoints

## 📊 Database Schema

### Core Tables

- **users**: User accounts and profiles
- **messages**: User messages/notifications
- **streams**: Radio stream information
- **playlists**: Curated content lists

## 📝 Directory Structure

```
velvetradio/
├── app/
│   ├── Models/               # Database models
│   ├── Http/
│   │   ├── Controllers/      # Request handlers
│   │   │   └── MessageProxyController
│   │   └── Requests/         # Input validation
│   ├── Services/             # Business logic
│   │   └── AuthSystemService
│   │   └── StreamingService
│   ├── Jobs/                 # Queue jobs
│   └── Providers/            # Service registration
├── routes/
│   ├── web.php               # Web routes
│   └── api.php               # API routes
├── resources/
│   └── js/
│       ├── Components/       # React components
│       ├── Layouts/          # Page layouts
│       ├── Pages/            # Full-page components
│       └── types/            # TypeScript types
├── database/
│   ├── migrations/           # Database structure
│   └── seeders/              # Test data
├── config/                   # Configuration
└── storage/                  # Uploads and cache
```

## 🚀 Scalability

1. **Database Optimization**: Index streams and user preferences
2. **Caching**: Cache stream metadata and user data
3. **Queue Jobs**: Use queues for stream processing
4. **Asset Delivery**: CDN for static assets and streams
5. **Load Balancing**: Multiple server support

## 🎵 Streaming Architecture

While streaming functionality is in foundation, VelvetRadio is designed to support:

- Real-time stream metadata
- Listener tracking
- Queue-based stream processing
- Media asset management
- Playlist functionality

Future streaming features can be built on this foundation.
