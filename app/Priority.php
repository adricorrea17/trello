<?php

namespace App;

enum Priority: string
{
    case Low = 'Baja';
    case Normal = 'Normal';
    case High = 'Alta';
    case Critical = 'Crítica';

    public function label(): string
    {
        return match ($this) {
            self::Low => 'Baja',
            self::Normal => 'Normal',
            self::High => 'Alta',
            self::Critical => 'Crítica',
        };
    }

    public function icon(): string
    {
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="' . $this->color() . '" class="w-4 h-4">
        <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
      </svg>';
        return $svg;
    }

    public function color(): string
    {
        return match ($this) {
            self::Low => '#FFD700',
            self::Normal => '#007BFF',
            self::High => '#FF6347',
            self::Critical => '#FF6347',
        };
    }
    public static function all(): array
    {
        return array_map(function ($case) {
            return [
                'label' => $case->label(),
                'icon' => $case->icon(),
                'color' => $case->color(),
            ];
        }, self::cases());
    }
}
