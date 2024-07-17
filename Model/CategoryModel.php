<?php

namespace Model;

require_once __DIR__ . "/../Database/Database.php";

use Database\Database;


class CategoryModel extends Database
{
  public function one(int $id): array
  {
    return $this->selectOne("SELECT id, name, parent_id FROM category WHERE id = :id LIMIT 1", ['id' => $id]);
  }

  public function all(int $limit = 10, int $offset = 0): array
  {
    return $this->select("SELECT id, name, parent_id FROM category LIMIT $limit OFFSET $offset");
  }
}
