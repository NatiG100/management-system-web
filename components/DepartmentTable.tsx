import DepartmentT from "@/api/types/department";
import { Flex, Paper, Stack, Table, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function DepartmentTable({departments}:{departments?:DepartmentT[]|null}){
    const [hilightedDepartment,setHilightedDepartment] = useState<string>('');
    function hilightDepartment(depId:string){
        setHilightedDepartment(depId);
        setTimeout(()=>{setHilightedDepartment('')},4000);
    }
    return(
        <Stack>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Parent Id</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Updated At</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {
                    departments?.length===0?
                    <Table.Td>No Department</Table.Td>:
                    departments?.map((department)=>(<Table.Tr id={department.id} key={department.id} className={`${department.id===hilightedDepartment?'text-blue-500 animate-pulse':"animate-none"}`}>
                        <Table.Td>
                          <Link
                            className="underline text-blue-700" 
                            href={`/departments/${department.id}`} 
                          >
                              {department.id}              
                          </Link>
                        </Table.Td>
                        <Table.Td>{department.name}</Table.Td>
                        <Table.Td>{department.description}</Table.Td>
                        <Table.Td>{
                            department.relationsAsAChild[0]?.parentId?
                            <Link
                                className="underline text-green-700" 
                                href={`#${department.relationsAsAChild[0].parentId}`} 
                                onClick={()=>hilightDepartment(department.relationsAsAChild[0].parentId)}
                            >{department.relationsAsAChild[0]?.parentId}</Link>:
                            "-"}</Table.Td>
                        <Table.Td>{department.createdAt}</Table.Td>
                        <Table.Td>{department.updatedAt}</Table.Td>
                    </Table.Tr>))
                }
            </Table.Tbody>
        </Table>
      </Stack>
    );
}