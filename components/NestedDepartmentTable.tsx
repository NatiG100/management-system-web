import DepartmentT from "@/api/types/department";
import { useState } from "react";
import {DataTable} from 'mantine-datatable';
import { IconChevronLeft, IconChevronRight, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/context/rootReducer";
import { Button, Dialog, Group, Text } from "@mantine/core";
import AddDepartmentModal from "./modals/AddDepartmentModal";
import EditDepartmentModal from "./modals/EditDepartmentModal";
import { useDisclosure } from "@mantine/hooks";
import { deleteDepartmentAction } from "@/context/department-slice/slice";
import Link from "next/link";

export type NestedDepartment = DepartmentT&{
    children:NestedDepartment
}[]

export interface NestedDepartmentTableProps{
    nestedDepartment:DepartmentT[],
}

export default function NestedDepartmentTable({nestedDepartment}:NestedDepartmentTableProps){
    const [expandedDepartments,setExpandedDepartments] = useState<string[]>([]);
    const {data,isLoading,errors} = useSelector((state:StateType)=>state.department.department);
    
    //add modal
    const [addOpened,setAddOpened] = useState<boolean>(false)
    const [addParent,setAddParent] = useState<string>("");
    function onAddClose(){
        setAddOpened(false);
    }

    //edit modal
    const [editOpened,setEditOpened] = useState<boolean>(false)
    const [editDepartment,setEditDepartment] = useState<DepartmentT|null>();
    function onEditClose(){
        setEditOpened(false);
    }

    //delete
    const [opened,{toggle,close}] = useDisclosure(false);
    const [selectedDepId,setSelectedDepId] = useState("")
    const dispatch = useDispatch()

    if(errors?.length!==0) return<p>{errors}</p>
    if(isLoading) return <p>Loading...</p>
    
    return(
        <>
            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md" c={"white"} bg={"var(--mantine-color-black)"}>
                <Text size="sm" mb="xs" fw={500}>
                    Are you sure? You want to delete the department?
                </Text>
                <Group align="flex-end">
                    <Button onClick={()=>{dispatch(deleteDepartmentAction(selectedDepId));close()}} c="var(--mantine-color-white)" bg="red">Delete</Button>
                </Group>
            </Dialog>
            <AddDepartmentModal
                onClose={onAddClose}
                opened={addOpened}
                parentDepartmentId={addParent}
            />
            {(editDepartment!==null && editDepartment!==undefined)&&
                <EditDepartmentModal
                    onClose={onEditClose}
                    opened={editOpened}
                    department={editDepartment}
                />
            }
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
                                <Link href={`/departments/${id}`} className="truncate underline text-blue-700">{id}</Link>
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
                        render:(department,index)=>(
                            <Group gap={6}>
                                <Button 
                                    size="xs" leftSection={<IconPlus size={15}/>}
                                    onClick={(event)=>{
                                        event.stopPropagation();
                                        setAddParent(department.id);
                                        setAddOpened(true);
                                    }}
                                >Add</Button>
                                <Button size="xs" leftSection={<IconEdit size={15}/>} bg="green"
                                    onClick={(event)=>{
                                        event.stopPropagation();
                                        setEditDepartment(department);
                                        setEditOpened(true);
                                    }}
                                >Update</Button>
                                <Button 
                                    size="xs" leftSection={<IconTrash size={15}/>} bg="red"
                                    onClick={(event)=>{
                                        event.stopPropagation();
                                        setSelectedDepId(department.id);
                                        toggle();
                                    }}
                                >Delete</Button>
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
            />
        </>
    );
}