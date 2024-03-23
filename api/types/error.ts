export default interface ErrorRes<T>{
    message:string,
    statusCode:number,
    data?:T
}