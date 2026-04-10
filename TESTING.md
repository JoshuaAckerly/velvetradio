# Testing Guide - VelvetRadio

Comprehensive guide to testing the VelvetRadio application.

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

## 🎯 Testing Philosophy

1. **Test Behavior**: Focus on what code does
2. **Arrange-Act-Assert**: Clear test structure
3. **Test Isolation**: Independent tests
4. **Meaningful Names**: Descriptive test names
5. **Fast Tests**: Quick feedback
6. **Real Scenarios**: Realistic cases

## 🔬 Test Types

### 1. Unit Tests

Test individual classes.

**Location**: `tests/Unit/`

**Example**:
```php
<?php
namespace Tests\Unit;

use App\Services\StreamingService;
use Tests\TestCase;

class StreamingServiceTest extends TestCase
{
    public function test_get_stream_metadata(): void
    {
        $service = new StreamingService();
        $metadata = $service->getMetadata('test-stream');
        
        $this->assertIsArray($metadata);
    }
}
```

### 2. Feature Tests

Test complete features.

**Location**: `tests/Feature/`

**Example**:
```php
<?php
namespace Tests\Feature;

use Tests\TestCase;

class StreamPageTest extends TestCase
{
    public function test_stream_page_loads(): void
    {
        $response = $this->get('/stream/1');
        $response->assertStatus(200);
    }
}
```

### 3. API Tests

Test endpoints.

**Example**:
```php
<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MessageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_messages_requires_auth(): void
    {
        $response = $this->get('/api/messages');
        $response->assertStatus(401);
    }

    public function test_messages_with_auth(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer token')
            ->get('/api/messages');
        
        $response->assertStatus(200)
            ->assertJsonIsArray();
    }
}
```

## 🏃 Running Tests

### PHPUnit

```bash
# Run all
./vendor/bin/phpunit

# By suite
./vendor/bin/phpunit tests/Unit
./vendor/bin/phpunit tests/Feature

# Specific file
./vendor/bin/phpunit tests/Feature/StreamPageTest.php

# Specific test
./vendor/bin/phpunit --filter test_stream_page_loads

# Coverage
./vendor/bin/phpunit --coverage-html coverage

# Stop on failure
./vendor/bin/phpunit --stop-on-failure
```

### Jest

```bash
# Run all
npm test

# Watch
npm test -- --watch

# File
npm test -- StreamPlayer

# Coverage
npm test -- --coverage
```

## ✍️ Writing Tests

### Naming

```php
// Good
test_stream_player_initializes_correctly()
test_messages_api_returns_array()

// Bad
test_stream()
test_messages()
```

### AAA Pattern

```php
public function test_stream_starts(): void
{
    // Arrange
    $streamId = 'stream-123';
    
    // Act
    $response = $this->get("/stream/$streamId");
    
    // Assert
    $response->assertStatus(200);
}
```

## 📊 Coverage

```bash
./vendor/bin/phpunit --coverage-html coverage
./vendor/bin/phpunit --coverage-text
```

Targets:
- Services: 90%+
- Controllers: 80%+
- Models: 75%+

## 🎯 Best Practices

1. **Test streaming logic** - verify stream handling
2. **Test API contracts** - request/response format
3. **Test authentication** - protected endpoints
4. **Test edge cases** - empty data, errors
5. **Use factories** - consistent data
6. **Mock external** - don't call real services
7. **Test both paths** - success and failure
8. **Keep tests fast** - quick feedback

## 🔍 Debugging

```bash
# Verbose output
./vendor/bin/phpunit -v

# Stop on first failure
./vendor/bin/phpunit --stop-on-failure

# Incomplete tests
./vendor/bin/phpunit --display-incomplete
```

## 📚 Resources

- [PHPUnit Documentation](https://phpunit.de/)
- [Jest Documentation](https://jestjs.io/)
- [Laravel Testing](https://laravel.com/docs/testing)
