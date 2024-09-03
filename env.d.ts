declare namespace NodeJS{
    interface ProcessEnv{
        readonly DB: string,
        readonly PORT: any
    }
}