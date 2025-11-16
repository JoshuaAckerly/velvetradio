<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_loads(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_shows_page_loads(): void
    {
        $response = $this->get('/shows');
        $response->assertStatus(200);
    }

    public function test_hosts_page_loads(): void
    {
        $response = $this->get('/hosts');
        $response->assertStatus(200);
    }

    public function test_episodes_page_loads_with_data(): void
    {
        $this->seed();
        
        $response = $this->get('/episodes');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('episodes')
                 ->where('episodes.0.title', 'Lorem Ipsum Dolor')
        );
    }

    public function test_shows_page_loads_with_data(): void
    {
        $this->seed();
        
        $response = $this->get('/shows');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('shows')
                 ->where('shows.0.title', 'Lorem Ipsum Radio')
        );
    }

    public function test_hosts_page_loads_with_data(): void
    {
        $this->seed();
        
        $response = $this->get('/hosts');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('hosts')
                 ->where('hosts.0.name', 'Alex Morgan')
        );
    }
}
