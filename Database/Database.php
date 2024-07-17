<?php

namespace Database;

use PDO;
use PDOStatement;

class Database
{
  private PDO $db;

  public function __construct()
  {
    try {
      $this->db = new PDO('mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';charset=utf8mb4;dbname=' . DB_DATABASE_NAME, DB_USERNAME, DB_PASSWORD);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    } catch (\PDOException $e) {
      throw new \Exception('Connection to database is broken, error: ' . $e->getMessage());
    }
  }

  public function select(string $query, array $params = []): array
  {
    return $this->query($query, $params)->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectOne(string $query, array $params = []): array
  {
    return $this->query($query, $params)->fetch(PDO::FETCH_ASSOC);
  }

  public function query(string $query, array $params = []): bool|PDOStatement
  {
    try {
      $stmt = $this->db->prepare($query);
      if ($stmt === false) {
        throw new \Exception('Unable to prepared statement for: ' . $query);
      }

      if (!empty($params)) {
        foreach ($params as $key => $value) {
          $stmt->bindValue(":$key", $value);
        }
      }

      $stmt->execute();

      return $stmt;
    } catch (\PDOException $e) {
      throw new \Exception("" . $e->getMessage());
    }
  }
}
