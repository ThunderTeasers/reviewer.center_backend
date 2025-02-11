/**
 * Маршрутизатор
 * =============
 *
 * Маршрутизатор (Router) - это объект, который
 * позволяет связать URL-адреса с функциями-обработчиками
 *
 * @author Max Erokhin
 */

import { serve } from 'bun';

// Типы запросов
type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type RouteCallback = ({
  params,
  query,
}: {
  params: any;
  query: any;
}) => Response | string | object;

// Объект с информацией о маршруте
type Route = {
  method: Method;
  path: string;
  pattern: RegExp;
  callback: RouteCallback;
  response: Response;
};

// Класс Router
class Router {
  // Массив маршрутов
  private readonly _routes: Route[];

  /**
   * Конструктор
   *
   * @constructor
   */
  constructor() {
    this._routes = [];
  }

  /**
   * Создает маршрут
   *
   * @param {Method} method Метод HTTP
   * @param {string} path Путь к ресурсу
   * @param {RouteCallback} callback Функция-обработчик
   *
   * @private
   */
  private createRoute(
    method: Method,
    path: string,
    callback: RouteCallback
  ): void {
    this._routes.push({
      method,
      path,
      callback,
      pattern: new RegExp(path.replace(/:(\w+)/g, '(?<$1>[a-zA-Z0-9-_]+)')),
      response: this.send404(),
    });
  }

  /**
   * Регистрирует маршрут для GET-запроса
   *
   * @param {string} path Путь к ресурсу
   * @param {Function} callback Функция-обработчик
   * @returns {Router} Текущий объект Router
   */
  public get(path: string, callback: RouteCallback): Router {
    this.createRoute('GET', path, callback);

    return this;
  }

  /**
   * Регистрирует маршрут для POST-запроса
   *
   * @param {string} path Путь к ресурсу
   * @param {Function} callback Функция-обработчик
   * @returns {Router} Текущий объект Router
   */
  public post(path: string, callback: RouteCallback): Router {
    this.createRoute('POST', path, callback);

    return this;
  }

  /**
   * Запускает HTTP-сервер
   *
   * @example
   * const router = new Router()
   *   .get('/', () => 'Hello, world!')
   *   .listen()
   */
  public listen(port: number = 3000): void {
    serve({
      port: 3000,
      fetch: async (request: Request) => {
        const { method } = request;
        const { pathname, searchParams } = new URL(request.url);

        // Поиск маршрута
        const route: Route | undefined = this._routes.find((route) =>
          route.method === method && route.path.includes(':')
            ? route.pattern.test(pathname)
            : route.path === pathname
        );

        // Отправка ответа
        if (route) {
          return this.sendResponse(
            route.callback({
              params: route.pattern.exec(pathname)?.groups,
              query: searchParams,
            })
          );
        }

        // Если маршрут не найден
        return this.send404();
      },
    });

    console.log(`Listening on http://localhost:${port}...`);
  }

  /**
   * Отправляет ответ клиенту в зависимости от типа ответа.
   *
   * Если ответ является экземпляром Response, он возвращается как есть.
   * Если ответ является строкой, создается объект Response с текстовым содержимым.
   * Если ответ является объектом, он преобразуется в JSON и отправляется с соответствующим заголовком.
   * В противном случае возвращается сообщение об ошибке с кодом состояния 405.
   *
   * @param {Response | string | object} response Ответ, который нужно отправить.
   * @returns {Response} Объект ответа для клиента.
   */

  private sendResponse(response: Response | string | object): Response {
    if (response instanceof Response) {
      return response;
    } else if (typeof response === 'string') {
      return new Response(response, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' },
      });
    } else if (typeof response === 'object') {
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return this.send404();
    }
  }

  /**
   * Отправляет ответ клиенту с кодом состояния 404.
   *
   * @returns {Response} Объект ответа с кодом состояния 404.
   */
  send404(): Response {
    return new Response(JSON.stringify({ error: 'Not found!' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Отправляет ответ клиенту с кодом состояния 502.
   *
   * @returns {Response} Объект ответа с кодом состояния 502.
   */
  send502(): Response {
    return new Response(JSON.stringify({ error: 'Error on server!' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Массив зарегистрированных маршрутов
   *
   * @type {Route[]}
   * @readonly
   */
  get routes() {
    return this._routes;
  }
}

export default Router;
