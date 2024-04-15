<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Faker\Factory;
class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();
        Categoria::insert([
            [
                'name' => 'General',
                'color' => $faker->hexColor(),
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Tecnologia',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Negocios',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Ciencia',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Cultura',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Deportes',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Entretenimiento',
            ],
            [
                'color' => $faker->hexColor(), 
                'name' => 'Otros',
            ],
        ]);
    }
}
