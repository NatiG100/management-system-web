import { StateType } from "@/context/rootReducer";
import { Table } from "@mantine/core";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

export default function Departments(){
    const [hilightedDepartment,setHilightedDepartment] = useState<string>('');
    function hilightDepartment(depId:string){
        setHilightedDepartment(depId);
        setTimeout(()=>{setHilightedDepartment('')},4000);
    }
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.department.department);
    return(
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Parent Id</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {
                    data?.length===0?
                    <Table.Td>No Department</Table.Td>:
                    data?.map((department)=>(<Table.Tr id={department.id} key={department.id} className={`${department.id===hilightedDepartment?'text-blue-500 animate-pulse':"animate-none"}`}>
                        <Table.Td>{department.id}</Table.Td>
                        <Table.Td>{department.name}</Table.Td>
                        <Table.Td>{department.description}</Table.Td>
                        <Table.Td>{
                            department.relationsAsAChild[0]?.parentId?
                            <Link
                                className="underline text-green-700" 
                                href={`#${department.id}`} 
                                onClick={()=>hilightDepartment(department.relationsAsAChild[0].parentId)}
                            >{department.relationsAsAChild[0]?.parentId}</Link>:
                            "-"}</Table.Td>
                    </Table.Tr>))
                }
            </Table.Tbody>
        </Table>
    )
};