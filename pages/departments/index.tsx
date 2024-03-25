import DepartmentT from "@/api/types/department";
import NestedDepartmentTable from "@/components/NestedDepartmentTable";
import AddDepartmentModal from "@/components/modals/AddDepartmentModal";
import { StateType } from "@/context/rootReducer";
import { Button, Paper, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
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
    
    const [addOpened,setAddOpened] = useState<boolean>(false)
    function onAddClose(){
        setAddOpened(false);
    }

    if(loading) return<p>Loading...</p>
    return(
        <Stack>
            <AddDepartmentModal
                onClose={onAddClose}
                opened={addOpened}
            />
            <Button 
                leftSection={<IconPlus/>}
                onClick={()=>{
                    setAddOpened(true)
                }}    
            >Add Root Department</Button>
            <Paper shadow="sm" withBorder>
                <NestedDepartmentTable
                    nestedDepartment={topDepartments}
                />
            </Paper>
        </Stack>
    );    
};