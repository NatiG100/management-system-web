import DepartmentRelationT from "./departmentRelation";

export default interface DepartmentT{
    id:string;
    name:string;
    description?:string;
    createdAt:string;
    updatedAt:string;
    creatorId:string;
    creator:string;
    relationsAsAChild:DepartmentRelationT[],
}