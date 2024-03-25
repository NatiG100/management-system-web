import DepartmentT from "@/api/types/department";
import { useState } from "react";
import {DataTable} from 'mantine-datatable';
import { IconChevronLeft, IconChevronRight, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { StateType } from "@/context/rootReducer";
import { Button, Group } from "@mantine/core";

export type NestedDepartment = DepartmentT&{
    children:NestedDepartment
}[]

export interface NestedDepartmentTableProps{
    nestedDepartment:DepartmentT[],
}

export default function NestedDepartmentTable({nestedDepartment}:NestedDepartmentTableProps){
    const [expandedDepartments,setExpandedDepartments] = useState<string[]>([]);
    const {data,isLoading,errors} = useSelector((state:StateType)=>state.department.department);
    if(errors?.length!==0) return<p>{errors}</p>
    if(isLoading) return <p>Loading...</p>
    return(
        <DataTable
            noHeader={(nestedDepartment[0]?.relationsAsAChild[0]?.parentId)?true:false}
            withTableBorder
            withColumnBorders
            highlightOnHover
            columns={[
                {
                    accessor:'id',
                    title:"Id",
                    noWrap:true,
                    render:({id},index)=>(
                        <div className="flex items-center">
                            <IconChevronRight
                                className={`${expandedDepartments.includes(id)&&'rotate-90'} transition-transform`}
                                size={15}
                            />
                            <span className="truncate ">{nestedDepartment[index]?.id}</span>
                        </div>
                    )
                },
                {accessor:'name', title:"Name", textAlign:'right', width:100, cellsClassName:"truncate"},
                {accessor:'description', title:"Description", textAlign:'right', width:100, cellsClassName:"truncate"},
                {accessor:'creatorId', title:"Creator ID", textAlign:'right', width:150, cellsClassName:"truncate"},
                {accessor:'createdAt', title:"Created At", textAlign:'right', width:150, cellsClassName:"truncate"},
                {accessor:'updatedAt', title:"Updated At", textAlign:'right', width:150, cellsClassName:"truncate"},
                {
                    accessor:'id',
                    render:({id},index)=>(
                        <Group gap={6}>
                            <Button size="xs" leftSection={<IconPlus size={15}/>}>Add</Button>
                            <Button size="xs" leftSection={<IconEdit size={15}/>} bg="green">Update</Button>
                            <Button size="xs" leftSection={<IconTrash size={15}/>} bg="red">Delete</Button>
                        </Group>
                    ),
                    title:"Action"
                }
            ]}
            
            records={nestedDepartment}
            rowExpansion={{
                allowMultiple:true,
                expanded:{recordIds:expandedDepartments,onRecordIdsChange:setExpandedDepartments},
                content:({record:department})=>(
                    (data?.filter((dep)=>(dep?.relationsAsAChild[0]?.parentId===department?.id))?.length!==0)?<NestedDepartmentTable
                        nestedDepartment={data?.filter((dep)=>(dep?.relationsAsAChild[0]?.parentId===department?.id))||[]}
                    />:<></>
                )
            }}
        >

        </DataTable>
    );
}