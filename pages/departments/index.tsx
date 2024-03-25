import DepartmentT from "@/api/types/department";
import NestedDepartmentTable from "@/components/NestedDepartmentTable";
import { StateType } from "@/context/rootReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Departments(){
    const {data,errors,isLoading} = useSelector((state:StateType)=>state.department.department);
    const [topDepartments,setTopDepartments] = useState<DepartmentT[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    useEffect(()=>{
        if(data){
            setTopDepartments(
                data.filter((dep)=>(dep.relationsAsAChild.length===0))
            );
            setLoading(false);
        }
    },[data])
    if(loading) return<p>Loading...</p>
    return(
        <NestedDepartmentTable
            nestedDepartment={topDepartments}
        />
    );    
};