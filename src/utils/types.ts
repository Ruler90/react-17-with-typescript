export interface IUser {
    username: string | null,
    password: string | null
}

export interface IPost {
    id: number,
    userId: number,
    title: string,
    body: string,
}

export enum postRequestStatuses {
    NOT_LOADED = 'not loaded',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
}
