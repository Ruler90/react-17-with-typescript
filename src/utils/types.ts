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
