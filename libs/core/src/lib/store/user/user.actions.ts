export class CreateUser {
  public static readonly type = '[User] Create';
  constructor(public payload: { name?: string }) {}
}

export class UpdateUser {
  public static readonly type = '[User] Update';
  constructor(public payload: { id: string, name: string }) {}
}
