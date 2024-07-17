<?php

namespace Controller;

require_once __DIR__ . "/../Model/CategoryModel.php";

use Model\CategoryModel;

class CategoryController extends Controller
{
  public function index()
  {
    $isError = false;
    $errorDesc = "";
    $errorHeader = "";

    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $queryStringParams = $this->getQueryStringParams();

    if (strtoupper($requestMethod) == "GET") {
      try {
        $category = new CategoryModel();
        $limit = 10;

        if (isset($queryStringParams['limit']) && is_numeric($queryStringParams['limit'])) {
          $limit = $queryStringParams['limit'];
        }

        $categories = $category->all($limit);
        $response = json_encode($categories);
      } catch (\Exception $e) {
        $errorHeader = 'HTTP/1.1 500 Internal Server Error';
        $errorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
      }
    } else {
      $isError = true;
      $errorHeader = 'HTTP/1.1 422 Unprocessable Entity';
      $errorDesc = 'Method not supported!';
    }

    if (!$isError) {
      $this->sendOutput($response, array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
    } else {
      $this->sendOutput(json_encode(array('error' => $errorDesc)), array('Content-Type: application/json', $errorHeader));
    }
  }
}