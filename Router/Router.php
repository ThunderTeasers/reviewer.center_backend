<?php

namespace Router;

class Router
{
  private $routes = [];

  public function add(string $method, string $url, callable $callback): void
  {
    $this->routes[] = ['method' => $method, 'url' => $url, 'callback' => $callback];
  }

  public function start(): mixed
  {
    $uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    foreach ($this->routes as $route) {
      $pattern = "@^" . preg_replace('/\\\:[a-zA-Z0-9\_\-]+/', '([a-zA-Z0-9\-\_]+)', preg_quote($route['url'])) . "$@D";
      $matches = [];

      if ($method == $route['method'] && preg_match($pattern, $uri, $matches)) {
        header("Content-Type: application/json");
        array_shift($matches);
        return call_user_func_array($route['callback'], $matches);
      }
    }

    header("Content-Type: text/html; charset=utf-8");
    return $this->error();
  }

  private function error(): string
  {
    echo '123';
  }
}
