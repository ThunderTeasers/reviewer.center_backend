<?php

namespace Utils;

class TypeChecker
{
  public static function checkInt(mixed $value, int $default = 0, int $min = 0, int $max = 10): int
  {
    // Проверка на то, является ли переданное значение целочисленным, 
    // если нет, то возвращаем значение по умолчанию
    $value = intval($value);
    if ($value == 0) {
      $value = $default;
    }

    // Проверка на выход за границы
    if ($value < $min) {
      $value = $min;
    } else if ($value > $max) {
      $value = $max;
    }

    return $value;
  }
}