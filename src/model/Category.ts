class Category {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _parentId: number;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

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

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get parentId(): number {
    return this._parentId;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }
}

export default Category;
