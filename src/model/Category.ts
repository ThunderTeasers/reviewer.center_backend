/**
 * Модель категории
 * ================
 *
 * @author Max Erokhin
 */

class Category {
  public id: number;
  public title: string;
  public link: string;
  public createdAt: string;
  public updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор
   * @param title Название
   * @param link Ссылка
   * @param createdAt Дата создания
   * @param updatedAt Дата обновления
   */
  constructor(
    id: number = 0,
    title: string = '',
    link: string = '',
    createdAt: string = '',
    updatedAt: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Category;
