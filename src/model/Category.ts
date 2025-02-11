/**
 * Модель категории
 * ================
 *
 * @author Max Erokhin
 */

class Category {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _parentId: number;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  /**
   * @constructor
   *
   * @param id Идентификатор категории
   * @param title Название категории
   * @param description Описание категории
   * @param parentId Идентификатор родительской категории
   * @param createdAt Дата создания категории
   * @param updatedAt Дата обновления категории
   */
  constructor(
    id: number,
    title: string,
    description: string,
    parentId: number,
    createdAt: string,
    updatedAt: string
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._parentId = parentId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  /**
   * @returns {number} Идентификатор категории
   * @readonly
   */
  public get id(): number {
    return this._id;
  }

  /**
   * @returns {string} Название категории
   * @readonly
   */
  public get title(): string {
    return this._title;
  }

  /**
   * @returns {string} Описание категории
   * @readonly
   */
  public get description(): string {
    return this._description;
  }

  /**
   * @returns {number} Идентификатор родительской категории. 0, если категория является корневой.
   * @readonly
   */
  public get parentId(): number {
    return this._parentId;
  }

  /**
   * @returns {string} Дата создания категории
   * @readonly
   */
  public get createdAt(): string {
    return this._createdAt;
  }

  /**
   * @returns {string} Дата обновления категории
   * @readonly
   */

  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export default Category;
