/* tslint:disable */
export abstract class IQuery {
  abstract temp__(): boolean | Promise<boolean>;
}

export abstract class Song {
  id: string;
  name: string;
}

export abstract class User {
  id: string;
  name: string;
}
