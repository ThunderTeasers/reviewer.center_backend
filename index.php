<?php
use Model\CategoryModel;
use Utils\TypeChecker;
use Router\Router;

require_once './Bootstrap.php';

$router = new Router();

$router->add('GET', '/categories', function () {
  $objFeedController = new CategoryModel();
  echo json_encode($objFeedController->all(TypeChecker::checkInt($_GET['limit'], 10), TypeChecker::checkInt($_GET['offset'])));
});

$router->add('GET', '/categories/:id', function ($id) {
  $objFeedController = new CategoryModel();
  echo json_encode($objFeedController->one($id));
});

$router->start();