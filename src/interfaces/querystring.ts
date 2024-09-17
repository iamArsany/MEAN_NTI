export default interface querystring{
    sort?:string,
    filter?:string[],
    limitFields?:string[],
    search?:string[],
    page?:number,
    limit?:number
    [Key:string]:any
}