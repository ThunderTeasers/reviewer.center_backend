/**
 * Модель компании
 * ================
 *
 * @author Max Erokhin
 */

class Company {
  public id: number;
  public title: string;
  public description: string;
  public link: string;
  public logo: string;
  public logo_full: boolean;
  public categoryId: number;
  public createdAt: string;
  public updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор компании
   * @param title Название категории
   * @param description Описание компании
   * @param link Ссылка на компанию
   * @param logo Логотип компании
   * @param logo_full Растянут ли логотип в карточке компании
   * @param categoryId Идентификатор категории
   * @param createdAt Дата создания компании
   * @param updatedAt Дата обновления компании
   */
  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    link: string = '',
    logo: string = '',
    logo_full: boolean = false,
    categoryId: number = 0,
    createdAt: string = '',
    updatedAt: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.link = link;
    this.logo = logo;
    this.logo_full = logo_full;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Company;
