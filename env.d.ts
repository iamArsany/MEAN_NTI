declare namespace NodeJS{
    interface ProcessEnv{
        readonly DB: string,
        readonly PORT: any,
        readonly NODE_ENV:string,
    }
}