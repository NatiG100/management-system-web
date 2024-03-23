export default interface UserT{
    id:string;
    fullName:string;
    email:string;
    password:string;
    status:"ACTIVE"|"INACTIVE"
}