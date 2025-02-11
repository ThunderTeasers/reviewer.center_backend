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
}) => Promise<Response>;

// Объект с информацией о маршруте
type Route = {
  method: Method;
  path: string;
  pattern: RegExp;
  callback: RouteCallback;
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

        for (const route of this._routes) {
          if (route.method === method) {
            if (route.path.includes(':')) {
              const matches = route.pattern.exec(pathname);
              if (matches) {
                const result = await route.callback({
                  params: matches?.groups,
                  query: searchParams,
                });
                return this.sendResponse(result);
              }
            } else if (route.path === pathname) {
              const result = await route.callback({
                params: {},
                query: searchParams,
              });
              return this.sendResponse(result);
            }
          }
        }

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
   * @param {any} response Ответ, который нужно отправить.
   * @returns {Response} Объект ответа для клиента.
   */

  private sendResponse(response: any): Response {
    if (response instanceof Response) {
      return response;
    } else if (typeof response === 'string') {
      return new Response(response);
    } else if (typeof response === 'object') {
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return this.send404();
    }
  }

  send404() {
    return new Response(JSON.stringify({ error: 'Not found!' }), {
      status: 404,
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
