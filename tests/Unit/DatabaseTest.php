<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class DatabaseTest extends TestCase
{
    public function test_basic_math(): void
    {
        $this->assertEquals(4, 2 + 2);
    }

    public function test_string_operations(): void
    {
        $this->assertEquals('Velvet Radio', 'Velvet' . ' ' . 'Radio');
    }
}
