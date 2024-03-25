import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Divider, Flex, Group, Paper, Stack, Table, Title } from "@mantine/core";
import {  useSelector } from "react-redux";
import { StateType } from "@/context/rootReducer";
import { useState } from "react";
import Link from "next/link";
import {IconUser,IconLayersIntersect} from "@tabler/icons-react"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hilightedDepartment,setHilightedDepartment] = useState<string>('');
    function hilightDepartment(depId:string){
        setHilightedDepartment(depId);
        setTimeout(()=>{setHilightedDepartment('')},4000);
    }
  const {data,errors,isLoading} = useSelector((state:StateType)=>state.department.department);
    return(
      <Stack>
        <Paper withBorder className="w-max" bg={"green"} c="var(--mantine-color-white)" shadow="sm" px={20} py={10}>
          <Flex align={"center"} gap={15}><IconUser/><Title size={25}>{data?.length} Departments</Title></Flex>
        </Paper>
        <Divider color="var(--mantine-primary-color-2)" />
        <Title >Department List</Title>
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
        <Divider color="var(--mantine-primary-color-2)" />
        <Title>Actions</Title>
        <Group>
          <Button leftSection={<IconLayersIntersect/>}>Manage Departments</Button>
          <Link href={"/account"}>
            <Button leftSection={<IconUser/>}>Manage Account</Button>
          </Link>
        </Group>
      </Stack>
    )
}
