
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Auth {
    user: User;
    token: string;
}

export abstract class IMutation {
    abstract signIn(email: string, password: string): Auth | Promise<Auth>;

    abstract signUp(email: string, password: string): Auth | Promise<Auth>;
}

export abstract class IQuery {
    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: string;
    email: string;
}
