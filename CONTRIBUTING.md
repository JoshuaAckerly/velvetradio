# Contributing to VelvetRadio

Thank you for contributing to VelvetRadio! This guide helps you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)

## 🤝 Code of Conduct

We're committed to a welcoming community.

### Expected Behavior
- Use welcoming language
- Respect different perspectives
- Accept feedback gracefully
- Prioritize community good
- Show empathy

### Unacceptable Behavior
- Harassment or trolling
- Personal attacks
- Private information sharing
- Inappropriate conduct

## 🚀 Getting Started

### Prerequisites

- PHP 8.1+ with Composer
- Node.js 18+ with npm
- MySQL 8.0+
- Git

### Setup

```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/velvetradio.git
cd velvetradio

# Add upstream
git remote add upstream https://github.com/JoshuaAckerly/velvetradio.git

# Install
composer install
npm install

# Environment
cp .env.example .env
php artisan key:generate

# Database
php artisan migrate

# Start
composer dev
```

## 🔄 Development Workflow

### 1. Create Branch

```bash
# Feature
git checkout -b feat/add-streaming-feature

# Bug fix
git checkout -b fix/message-api

# Docs
git checkout -b docs/update-guide

# Tests
git checkout -b test/add-stream-tests
```

### 2. Make Changes

```bash
# Edit code
# Test
./vendor/bin/phpunit
npm test

# Commit
git commit -m "feat: add feature"

# Update
git fetch upstream
git rebase upstream/main
```

### 3. Quality

```bash
# Tests
./vendor/bin/phpunit
npm test

# Analysis
./vendor/bin/phpstan analyse
vendor/bin/pint
npm run lint

# Types
npm run types
```

## 📝 Coding Standards

### PHP

- **PSR-12** style
- Type parameters and returns
- Clear names
- Single responsibility

**Example**:
```php
<?php
namespace App\Services;

class StreamService
{
    public function getStream(string $id): Stream {
        // Get stream
    }
}
```

### TypeScript

- Type variables
- ESLint rules
- Clear names
- Single purpose

**Example**:
```typescript
interface Stream {
    id: string;
    title: string;
    url: string;
}

export function StreamPlayer({ stream }: { stream: Stream }): JSX.Element {
    return <audio src={stream.url} />;
}
```

## 📋 Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: Feature
- `fix`: Bug fix
- `docs`: Docs
- `test`: Tests
- `refactor`: Refactoring
- `perf`: Performance

**Example**:
```
feat(streaming): add stream metadata API

Add endpoint for retrieving stream metadata.
- Caching enabled
- Optimized queries
- Error handling

Closes #456
```

## 🔄 Pull Requests

### Before

- [ ] Tests pass
- [ ] Checks pass
- [ ] Docs updated
- [ ] Branch updated
- [ ] Clean commits

### Title

```
feat: add streaming feature
fix: resolve API issue
docs: update guide
```

### Description

```markdown
## Description
What changed?

## Motivation
Why?

## Types
- [ ] Feature
- [ ] Bug
- [ ] Docs

## Testing
How?

## Checklist
- [ ] Tests pass
- [ ] Checks pass
- [ ] Docs updated
```

## ✅ Testing

### Backend

```bash
./vendor/bin/phpunit
./vendor/bin/phpunit --coverage-html coverage
```

Must include:
- Stream tests
- API tests
- Message tests

### Frontend

```bash
npm test
npm test -- --coverage
```

Must include:
- Component tests
- Player tests

## 🎯 Ideas

- **Features**: Streaming improvements
- **Bugs**: Fix issues
- **Tests**: Add coverage
- **Docs**: Improve guides
- **Performance**: Optimize

## 📞 Help

- Open issue
- Check docs
- Comment on PR
- Contact maintainers

Thank you! 🎵
