<?php

namespace Controller;

class Controller
{
  public function __call($method, $args)
  {
    $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
  }

  protected function getUriSegments(): bool|array
  {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    return $uri;
  }

  protected function getQueryStringParams(): array|bool|int|string|null
  {
    return parse_url($_SERVER['QUERY_STRING'], PHP_URL_QUERY);
  }

  protected function sendOutput(string $data, array $headers): void
  {
    header_remove('Set-Cookie');

    if (is_array($headers) && !empty($headers)) {
      foreach ($headers as $header) {
        header($header);
      }
    }

    echo $data;
    exit;
  }
}